use std::sync::Arc;
use juniper::{EmptySubscription, FieldResult, RootNode};
use warp::{http::Response, Filter};

// Simplified GraphQL schema for demo purposes
#[derive(Clone, Debug)]
pub struct Context;

impl juniper::Context for Context {}

#[derive(Clone, Debug)]
pub struct MenuEntry {
    pub id: i32,
    pub name: String,
    pub description: Option<String>,
}

#[juniper::graphql_object(context = Context)]
impl MenuEntry {
    fn id(&self) -> i32 {
        self.id
    }

    fn name(&self) -> &str {
        &self.name
    }

    fn description(&self) -> Option<&str> {
        self.description.as_deref()
    }
}

pub struct Query;

#[juniper::graphql_object(context = Context)]
impl Query {
    fn get_all_menu_entries(_context: &Context) -> FieldResult<Vec<MenuEntry>> {
        Ok(vec![
            MenuEntry {
                id: 1,
                name: "Margherita Pizza".to_string(),
                description: Some("Classic pizza with tomato sauce, mozzarella, and basil".to_string()),
            },
            MenuEntry {
                id: 2,
                name: "Caesar Salad".to_string(),
                description: Some("Fresh romaine lettuce with caesar dressing".to_string()),
            },
        ])
    }

    fn get_menu_entry_by_id(_context: &Context, id: i32) -> FieldResult<Option<MenuEntry>> {
        let entries = vec![
            MenuEntry {
                id: 1,
                name: "Margherita Pizza".to_string(),
                description: Some("Classic pizza with tomato sauce, mozzarella, and basil".to_string()),
            },
            MenuEntry {
                id: 2,
                name: "Caesar Salad".to_string(),
                description: Some("Fresh romaine lettuce with caesar dressing".to_string()),
            },
        ];
        
        Ok(entries.into_iter().find(|entry| entry.id == id))
    }
}

pub struct Mutation;

#[juniper::graphql_object(context = Context)]
impl Mutation {
    fn create_menu_entry(_context: &Context, name: String, description: Option<String>) -> FieldResult<MenuEntry> {
        Ok(MenuEntry {
            id: 3, // In a real app, this would be generated
            name,
            description,
        })
    }
}

type Schema = RootNode<'static, Query, Mutation, EmptySubscription<Context>>;

fn schema() -> Schema {
    Schema::new(Query, Mutation, EmptySubscription::new())
}

#[tokio::main]
async fn main() {
    let schema = schema();
    let context = Context;

    println!("🚀 Starting Menu GraphQL Server with Warp");
    println!("📊 GraphiQL Playground: http://localhost:8000/graphiql");
    println!("🔍 GraphQL Endpoint: http://localhost:8000/graphql");
    println!("🏥 Health Check: http://localhost:8000/health");

    let health = warp::path("health")
        .map(|| {
            Response::builder()
                .header("content-type", "application/json")
                .body(r#"{"status": "ok", "service": "menu-graphql-server", "version": "1.0.0"}"#)
        });

    let graphql_filter = juniper_warp::make_graphql_filter(schema, warp::any().map(move || context.clone()).boxed());

    let graphiql = warp::path("graphiql")
        .and(juniper_warp::graphiql_filter("/graphql", None));

    let cors = warp::cors()
        .allow_any_origin()
        .allow_headers(vec!["content-type", "authorization"])
        .allow_methods(vec!["GET", "POST", "OPTIONS"]);

    let routes = health
        .or(graphiql)
        .or(warp::path("graphql").and(graphql_filter))
        .with(cors);

    println!("🎯 Server listening on http://0.0.0.0:8000");
    
    warp::serve(routes)
        .run(([0, 0, 0, 0], 8000))
        .await;
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_schema_creation() {
        let schema = schema();
        assert!(!schema.as_schema_language().is_empty());
    }

    #[tokio::test]
    async fn test_query_execution() {
        let schema = schema();
        let context = Context;
        
        let query = "{ getAllMenuEntries { id name description } }";
        let result = juniper::execute_sync(query, None, &schema, &juniper::Variables::new(), &context);
        
        assert!(result.is_ok());
        let (value, errors) = result.unwrap();
        assert!(errors.is_empty());
        assert!(value.as_object_value().is_some());
    }
}