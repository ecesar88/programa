use juniper::{GraphQLEnum, GraphQLInputObject, GraphQLObject};

#[derive(GraphQLObject)]
#[graphql(description = "A hobbit from Middle-earth")]
pub struct HobbitType {
    pub id: i32,
    pub name: String,
    pub home_planet: String,
}

#[derive(GraphQLEnum)]
pub enum Episode {
    NewHope,
    Empire,
    Jedi,
}

// There is also a custom derive for mapping GraphQL input objects.
#[derive(GraphQLInputObject)]
#[graphql(description = "Input to create a hobbit object")]
pub struct HobbitCreateInput {
    pub name: String,
    pub home_planet: String,
}

#[derive(GraphQLInputObject)]
#[graphql(description = "Input to update a hobbit object")]
pub struct HobbitUpdateInput {
    pub name: Option<String>,
    pub home_planet: Option<String>,
}

