use juniper::graphql_object;
use sea_orm::{ActiveValue::Set, ActiveModelTrait, EntityTrait};

use crate::entity::{hobbit::ActiveModel, hobbit::Entity};
use crate::graphql::schema::hobbit::types::{Episode, HobbitCreateInput, HobbitUpdateInput, HobbitType};
use crate::graphql::Context;

pub struct Query;
pub struct Mutation;

#[graphql_object(context = Context)]
impl Query {
    fn episode() -> Episode {
        Episode::Jedi
    }

    // Example of using the context to access the database:
    async fn hobbits(context: &Context) -> juniper::FieldResult<Vec<HobbitType>> {
        let hobbits = Entity::find()
            .all(context.db.as_ref())
            .await?;

        Ok(hobbits.into_iter().map(|h| HobbitType {
            id: h.id,
            name: h.name.clone(),
            home_planet: h.home_planet.clone(),
        }).collect())
    }
}

#[graphql_object(context = Context)]
impl Mutation {
    async fn create_hobbit(context: &Context, input: HobbitCreateInput) -> juniper::FieldResult<HobbitType> {
        let hobbit_active = ActiveModel {
            name: Set(input.name.clone()),
            home_planet: Set(input.home_planet.clone()),
            ..Default::default()
        };

        let hobbit_on_db = hobbit_active
            .insert(context.db.as_ref())
            .await?;

        Ok(HobbitType {
            id: hobbit_on_db.id,
            name: hobbit_on_db.name.clone(),
            home_planet: hobbit_on_db.home_planet.clone(),
        })
    }

    async fn update_hobbit(
        context: &Context,
        id: i32,
        input: HobbitUpdateInput,
    ) -> juniper::FieldResult<HobbitType> {
        // Find the existing record
        let hobbit = Entity::find_by_id(id)
            .one(context.db.as_ref())
            .await?
            .ok_or("Hobbit not found")?;

        let hobbit_active = ActiveModel {
            id: Set(hobbit.id), // Keep the ID
            name: Set(input.name.unwrap_or_default()), // Replace with empty if None
            home_planet: Set(input.home_planet.unwrap_or_default()), // Replace with empty if None
        };

        // Save the updated record
        let hobbit_on_db = hobbit_active
            .update(context.db.as_ref())
            .await?;

        Ok(HobbitType {
            id: hobbit_on_db.id,
            name: hobbit_on_db.name.clone(),
            home_planet: hobbit_on_db.home_planet.clone(),
        })
    }

    async fn delete_hobbit(context: &Context, id: i32) -> juniper::FieldResult<bool> {
        let result = Entity::delete_by_id(id)
            .exec(context.db.as_ref())
            .await?;

        Ok(result.rows_affected > 0)
    }
}

