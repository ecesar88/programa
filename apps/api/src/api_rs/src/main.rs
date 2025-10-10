#![expect(unused_crate_dependencies, reason = "example")]
// #[macro_use]
extern crate rocket;

mod graphql;

use crate::graphql::schema::{Episode, Human};

// use juniper::{
//     EmptyMutation,
//     EmptySubscription,
//     RootNode,
//     // tests::fixtures::starwars::schema::{Database, Query},
// };
use rocket::{response::content::RawHtml, routes};

// type Schema = RootNode<Query, EmptyMutation<Database>, EmptySubscription<Database>>;

#[rocket::get("/")]
async fn homepage() -> RawHtml<&'static str> {
    RawHtml(
        "<html><h1>juniper_rocket/simple example</h1>\
               <div>visit <a href=\"/graphiql\">GraphiQL</a></div>\
               <div>visit <a href=\"/playground\">GraphQL Playground</a></div>\
         </html>",
    )
}

#[rocket::get("/graphiql")]
fn graphiql() -> RawHtml<String> {
    juniper_rocket::graphiql_source("/graphql", None)
}

#[rocket::get("/playground")]
fn playground() -> RawHtml<String> {
    juniper_rocket::playground_source("/graphql", None)
}

#[rocket::launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![homepage, graphiql, playground])
}
