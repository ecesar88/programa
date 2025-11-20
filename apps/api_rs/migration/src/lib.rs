pub use sea_orm_migration::prelude::*;

mod m20251119_030453_create_table_human;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20251119_030453_create_table_human::Migration),
        ]
    }
}
