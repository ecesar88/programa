pub mod schema;

use std::sync::Arc;
use sea_orm::DatabaseConnection;

#[derive(Clone)]
pub struct Context {
    pub db: Arc<DatabaseConnection>,
}

impl juniper::Context for Context {}
