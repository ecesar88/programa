#![expect(unused_crate_dependencies, reason = "example")]
#[macro_use]
extern crate rocket;

mod graphql;

use juniper::{EmptyMutation, EmptySubscription, RootNode};
use rocket::{State, response::content::RawHtml};
use sea_orm::{Database, DatabaseConnection};
use rocket::tokio;
use std::sync::Arc;

use crate::graphql::schema::human::operations::Query;

struct Schema {
    root_node: RootNode<Query, EmptyMutation, EmptySubscription>,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let database_url = "sqlite:./database.sqlite?mode=rwc";

    // Async database connection setup
    let db = Database::connect(database_url).await?;

    let schema = Schema {
        root_node: RootNode::new(
            Query,
            juniper::EmptyMutation::new(),
            juniper::EmptySubscription::new(),
        ),
    };

    // Wrap db and schema in Arc to share between threads
    let db = Arc::new(db);
    let schema = Arc::new(schema);

    rocket::build()
        .manage(db)  // Manage the Database state
        .manage(schema)  // Manage the Schema state
        .mount("/", routes![homepage, graphiql, playground, post_graphql])
        .launch()
        .await?;

    Ok(())
}

#[rocket::get("/")]
async fn homepage() -> RawHtml<&'static str> {
    RawHtml(
        "<html><h1>juniper_rocket/simple example</h1>\
               <div>visit <a href=\"/graphiql\">GraphiQL</a></div>\
               <div>visit <a href=\"/playground\">GraphQL Playground</a></div>\
         </html>",
    )
}

#[rocket::get("/graphql")]
fn graphiql() -> RawHtml<String> {
    juniper_rocket::graphiql_source("/graphql", None)
}

#[rocket::get("/playground")]
fn playground() -> RawHtml<String> {
    juniper_rocket::playground_source("/graphql", None)
}

#[rocket::post("/graphql", data = "<request>")]
async fn post_graphql(
    _db: &State<Arc<DatabaseConnection>>,  // Use Arc for shared ownership
    request: juniper_rocket::GraphQLRequest,
    schema: &State<Arc<Schema>>,  // Use Arc for shared ownership
) -> juniper_rocket::GraphQLResponse {
    request.execute(&schema.root_node, &()).await
}
