use juniper::graphql_object;

use crate::graphql::schema::human::types::{Episode};

pub struct Query;

struct _Ctx();

#[graphql_object]
// #[graphql(context = Ctx)]
impl Query {
    fn episode() -> Episode {
        Episode::Jedi
    }
}
