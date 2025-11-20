extern crate rocket;

mod graphql;

use std::sync::Arc;

use juniper::RootNode;
use rocket::tokio;

use rocket::{State, response::content::RawHtml, routes};
use sea_orm::{Database, DatabaseConnection};

use crate::graphql::schema::human::operations::{Mutation, Query};

struct Schema {
    root_node: RootNode<Query, Mutation, juniper::EmptySubscription>,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let database_url = "sqlite:./database.sqlite?mode=rwc";

    let db = Database::connect(database_url).await?;

    let schema = Schema {
        root_node: RootNode::new(Query, Mutation, juniper::EmptySubscription::new()),
    };

    let db = Arc::new(db);
    let schema = Arc::new(schema);

    rocket::build()
        .manage(db)
        .manage(schema)
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
    db: &State<Arc<DatabaseConnection>>,
    request: juniper_rocket::GraphQLRequest,
    schema: &State<Arc<Schema>>,
) -> juniper_rocket::GraphQLResponse {
    request.execute(&schema.root_node, &()).await
}
