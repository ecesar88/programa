use juniper::graphql_object;
use sea_orm::Database;

use crate::graphql::schema::human::types::{Episode, Human};

pub struct Query;
pub struct Mutation;

struct _Ctx();

#[graphql_object]
// #[graphql(context = Ctx)]
impl Query {
    // fn humans<'db>(&self, context: &'db Database) -> Vec<&'db Human> {
    //     db.
    // }

    fn episode() -> Episode {
        Episode::Jedi
    }

}


#[graphql_object]
// #[graphql(context = Ctx)]
impl Mutation {
    fn human() -> Episode {
        Episode::Empire
    }

    // fn human<'db>(&self, context: &'db Database) -> Vec<&'db Human> {
    //     db
    // }
}
