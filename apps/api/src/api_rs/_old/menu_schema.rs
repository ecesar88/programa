#![expect(missing_docs, reason = "GraphQL schema for menu system")]

use std::collections::HashMap;
use juniper::{GraphQLEnum, GraphQLInputObject, GraphQLObject, FieldResult, Context as JuniperContext};
use serde::{Deserialize, Serialize};

// Database context - this would interface with your actual database
#[derive(Clone, Default)]
pub struct Database {
    menu_entries: HashMap<i32, MenuEntry>,
    menu_entry_labels: HashMap<i32, MenuEntryLabel>,
    menu_entry_categories: HashMap<i32, MenuEntryCategory>,
    menu_entry_variants: HashMap<i32, MenuEntryVariant>,
    next_id: i32,
}

impl JuniperContext for Database {}

impl Database {
    pub fn new() -> Self {
        let mut db = Database {
            menu_entries: HashMap::new(),
            menu_entry_labels: HashMap::new(),
            menu_entry_categories: HashMap::new(),
            menu_entry_variants: HashMap::new(),
            next_id: 1,
        };

        // Add some sample data
        db.seed_data();
        db
    }

    fn get_next_id(&mut self) -> i32 {
        let id = self.next_id;
        self.next_id += 1;
        id
    }

    fn seed_data(&mut self) {
        // Create sample labels
        let label1 = MenuEntryLabel {
            id: self.get_next_id(),
            name: Some("Vegetarian".to_string()),
            color: Some("#4CAF50".to_string()),
        };
        let label2 = MenuEntryLabel {
            id: self.get_next_id(),
            name: Some("Spicy".to_string()),
            color: Some("#FF5722".to_string()),
        };
        self.menu_entry_labels.insert(label1.id, label1);
        self.menu_entry_labels.insert(label2.id, label2);

        // Create sample categories
        let category1 = MenuEntryCategory {
            id: self.get_next_id(),
            name: Some("Main Dishes".to_string()),
        };
        let category2 = MenuEntryCategory {
            id: self.get_next_id(),
            name: Some("Beverages".to_string()),
        };
        self.menu_entry_categories.insert(category1.id, category1);
        self.menu_entry_categories.insert(category2.id, category2);

        // Create sample variants
        let variant1 = MenuEntryVariant {
            id: self.get_next_id(),
            name: Some("Small".to_string()),
            description: Some("Small portion".to_string()),
            price: Some(12.99),
        };
        let variant2 = MenuEntryVariant {
            id: self.get_next_id(),
            name: Some("Large".to_string()),
            description: Some("Large portion".to_string()),
            price: Some(18.99),
        };
        self.menu_entry_variants.insert(variant1.id, variant1);
        self.menu_entry_variants.insert(variant2.id, variant2);

        // Create sample menu entry
        let menu_entry = MenuEntry {
            id: self.get_next_id(),
            name: "Margherita Pizza".to_string(),
            description: Some("Classic pizza with tomato sauce, mozzarella, and basil".to_string()),
            variant_ids: vec![variant1.id, variant2.id],
            label_ids: vec![1], // Vegetarian
            category_ids: vec![3], // Main Dishes
        };
        self.menu_entries.insert(menu_entry.id, menu_entry);
    }

    pub fn get_menu_entry(&self, id: i32) -> Option<&MenuEntry> {
        self.menu_entries.get(&id)
    }

    pub fn get_all_menu_entries(&self) -> Vec<&MenuEntry> {
        self.menu_entries.values().collect()
    }

    pub fn get_menu_entry_label(&self, id: i32) -> Option<&MenuEntryLabel> {
        self.menu_entry_labels.get(&id)
    }

    pub fn get_all_menu_entry_labels(&self) -> Vec<&MenuEntryLabel> {
        self.menu_entry_labels.values().collect()
    }

    pub fn search_menu_entry_labels(&self, search_term: &str) -> Vec<&MenuEntryLabel> {
        self.menu_entry_labels
            .values()
            .filter(|label| {
                label.name.as_ref().map_or(false, |name| {
                    name.to_lowercase().contains(&search_term.to_lowercase())
                })
            })
            .collect()
    }

    pub fn get_menu_entry_category(&self, id: i32) -> Option<&MenuEntryCategory> {
        self.menu_entry_categories.get(&id)
    }

    pub fn get_menu_entry_variant(&self, id: i32) -> Option<&MenuEntryVariant> {
        self.menu_entry_variants.get(&id)
    }

    pub fn create_menu_entry(&mut self, input: MenuEntryInput) -> MenuEntry {
        let id = self.get_next_id();
        let mut variant_ids = vec![];
        let mut label_ids = vec![];
        let mut category_ids = vec![];

        // Create variants if provided
        if let Some(variants) = input.variants {
            for variant_input in variants {
                let variant_id = self.get_next_id();
                let variant = MenuEntryVariant {
                    id: variant_id,
                    name: Some(variant_input.name),
                    description: Some(variant_input.description),
                    price: Some(variant_input.price),
                };
                self.menu_entry_variants.insert(variant_id, variant);
                variant_ids.push(variant_id);
            }
        }

        // Create labels if provided
        if let Some(labels) = input.labels {
            for label_input in labels {
                let label_id = self.get_next_id();
                let label = MenuEntryLabel {
                    id: label_id,
                    name: Some(label_input.name),
                    color: Some(label_input.color),
                };
                self.menu_entry_labels.insert(label_id, label);
                label_ids.push(label_id);
            }
        }

        // Create categories if provided
        if let Some(categories) = input.categories {
            for category_input in categories {
                let category_id = self.get_next_id();
                let category = MenuEntryCategory {
                    id: category_id,
                    name: Some(category_input.name),
                };
                self.menu_entry_categories.insert(category_id, category);
                category_ids.push(category_id);
            }
        }

        let menu_entry = MenuEntry {
            id,
            name: input.name,
            description: input.description,
            variant_ids,
            label_ids,
            category_ids,
        };

        self.menu_entries.insert(id, menu_entry.clone());
        menu_entry
    }

    pub fn update_menu_entry(&mut self, id: i32, input: MenuEntryInput) -> Option<MenuEntry> {
        if !self.menu_entries.contains_key(&id) {
            return None;
        }

        // Remove old related data (simplified - in real implementation you'd handle this more carefully)
        if let Some(old_entry) = self.menu_entries.get(&id) {
            for variant_id in &old_entry.variant_ids {
                self.menu_entry_variants.remove(variant_id);
            }
            for label_id in &old_entry.label_ids {
                self.menu_entry_labels.remove(label_id);
            }
            for category_id in &old_entry.category_ids {
                self.menu_entry_categories.remove(category_id);
            }
        }

        // Create new entry with the same ID
        let mut new_entry = self.create_menu_entry(input);
        new_entry.id = id;
        self.menu_entries.insert(id, new_entry.clone());
        Some(new_entry)
    }

    pub fn delete_menu_entry(&mut self, id: i32) -> Option<MenuEntry> {
        if let Some(entry) = self.menu_entries.remove(&id) {
            // Clean up related data
            for variant_id in &entry.variant_ids {
                self.menu_entry_variants.remove(variant_id);
            }
            for label_id in &entry.label_ids {
                self.menu_entry_labels.remove(label_id);
            }
            for category_id in &entry.category_ids {
                self.menu_entry_categories.remove(category_id);
            }
            Some(entry)
        } else {
            None
        }
    }

    pub fn create_or_update_menu_entry_label(&mut self, id: Option<i32>, input: MenuEntryLabelInput) -> MenuEntryLabel {
        if let Some(existing_id) = id {
            // Update existing label
            let label = MenuEntryLabel {
                id: existing_id,
                name: Some(input.name),
                color: Some(input.color),
            };
            self.menu_entry_labels.insert(existing_id, label.clone());
            label
        } else {
            // Create new label
            let new_id = self.get_next_id();
            let label = MenuEntryLabel {
                id: new_id,
                name: Some(input.name),
                color: Some(input.color),
            };
            self.menu_entry_labels.insert(new_id, label.clone());
            label
        }
    }

    pub fn delete_menu_entry_label(&mut self, id: i32) -> Option<MenuEntryLabel> {
        self.menu_entry_labels.remove(&id)
    }
}

// Core types
#[derive(GraphQLObject, Clone, Debug, Serialize, Deserialize)]
#[graphql(description = "A label on the MenuEntry type. This can be used to categorize MenuEntries with different labels.")]
pub struct MenuEntryLabel {
    pub id: i32,
    pub name: Option<String>,
    pub color: Option<String>,
}

#[derive(GraphQLObject, Clone, Debug, Serialize, Deserialize)]
#[graphql(description = "The category of a specific MenuEntry. This can be used to sort products by type, such as drinks, meats, grains, etc")]
pub struct MenuEntryCategory {
    pub id: i32,
    pub name: Option<String>,
}

#[derive(GraphQLObject, Clone, Debug, Serialize, Deserialize)]
#[graphql(description = "A variant on the MenuEntry, this can be a different sized or flavored product")]
pub struct MenuEntryVariant {
    pub id: i32,
    pub name: Option<String>,
    pub description: Option<String>,
    pub price: Option<f64>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct MenuEntry {
    pub id: i32,
    pub name: String,
    pub description: Option<String>,
    pub variant_ids: Vec<i32>,
    pub label_ids: Vec<i32>,
    pub category_ids: Vec<i32>,
}

#[GraphQLObject]
#[graphql(description = "An entry on the menu")]
impl MenuEntry {
    pub fn id(&self) -> i32 {
        self.id
    }

    pub fn name(&self) -> &str {
        &self.name
    }

    pub fn description(&self) -> Option<&str> {
        self.description.as_deref()
    }

    pub fn variants(&self, context: &Database) -> Vec<MenuEntryVariant> {
        self.variant_ids
            .iter()
            .filter_map(|id| context.get_menu_entry_variant(*id))
            .cloned()
            .collect()
    }

    pub fn labels(&self, context: &Database) -> Vec<MenuEntryLabel> {
        self.label_ids
            .iter()
            .filter_map(|id| context.get_menu_entry_label(*id))
            .cloned()
            .collect()
    }

    pub fn categories(&self, context: &Database) -> Vec<MenuEntryCategory> {
        self.category_ids
            .iter()
            .filter_map(|id| context.get_menu_entry_category(*id))
            .cloned()
            .collect()
    }
}

// Input types
#[derive(GraphQLInputObject, Debug)]
#[graphql(description = "Input for creating a menu entry variant")]
pub struct MenuEntryVariantInput {
    pub name: String,
    pub description: String,
    pub price: f64,
}

#[derive(GraphQLInputObject, Debug)]
#[graphql(description = "Input for creating a menu entry label")]
pub struct MenuEntryLabelInput {
    pub name: String,
    pub color: String,
}

#[derive(GraphQLInputObject, Debug)]
#[graphql(description = "Input for creating a menu entry category")]
pub struct MenuEntryCategoryInput {
    pub name: String,
}

#[derive(GraphQLInputObject, Debug)]
#[graphql(description = "Input to create or update a MenuEntry")]
pub struct MenuEntryInput {
    pub name: String,
    pub description: Option<String>,
    pub variants: Option<Vec<MenuEntryVariantInput>>,
    pub labels: Option<Vec<MenuEntryLabelInput>>,
    pub categories: Option<Vec<MenuEntryCategoryInput>>,
}

// Error types
#[derive(Debug)]
pub struct RecordNotFoundError {
    pub message: String,
}

impl std::fmt::Display for RecordNotFoundError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "Record not found: {}", self.message)
    }
}

impl std::error::Error for RecordNotFoundError {}

// Query root
#[derive(Clone, Copy, Debug)]
pub struct Query;

#[juniper::graphql_object(context = Database)]
impl Query {
    /// Get all menu entries with optional pagination
    fn get_all_menu_entries(
        #[graphql(context)] database: &Database,
        #[graphql(description = "Page number for pagination", default = 1)] page: Option<i32>,
    ) -> FieldResult<Vec<MenuEntry>> {
        let entries = database.get_all_menu_entries();
        Ok(entries.into_iter().cloned().collect())
    }

    /// Get a specific menu entry by ID
    fn get_menu_entry_by_id(
        #[graphql(context)] database: &Database,
        #[graphql(description = "ID of the menu entry")] id: i32,
    ) -> FieldResult<MenuEntry> {
        database
            .get_menu_entry(id)
            .cloned()
            .ok_or_else(|| format!("MenuEntry with id {} not found", id).into())
    }

    /// Get all menu entry labels with optional pagination
    fn get_all_menu_entry_labels(
        #[graphql(context)] database: &Database,
        #[graphql(description = "Page number for pagination", default = 1)] page: Option<i32>,
    ) -> FieldResult<Vec<MenuEntryLabel>> {
        let labels = database.get_all_menu_entry_labels();
        Ok(labels.into_iter().cloned().collect())
    }

    /// Search menu entry labels by name
    fn search_menu_entry_labels(
        #[graphql(context)] database: &Database,
        #[graphql(description = "Search term to find labels")] search_term: String,
    ) -> FieldResult<Vec<MenuEntryLabel>> {
        let labels = database.search_menu_entry_labels(&search_term);
        Ok(labels.into_iter().cloned().collect())
    }
}

// Mutation root
#[derive(Clone, Copy, Debug)]
pub struct Mutation;

#[juniper::graphql_object(context = Database)]
impl Mutation {
    /// Create a new menu entry
    fn create_menu_entry(
        #[graphql(context)] database: &Database,
        #[graphql(description = "Data for creating the menu entry")] data: MenuEntryInput,
    ) -> FieldResult<MenuEntry> {
        // Note: In a real implementation, you'd use a mutable database connection
        // For now, we'll simulate the creation by returning a mock entry
        let mut mock_db = database.clone();
        let entry = mock_db.create_menu_entry(data);
        Ok(entry)
    }

    /// Update an existing menu entry
    fn update_menu_entry(
        #[graphql(context)] database: &Database,
        #[graphql(description = "ID of the menu entry to update")] id: i32,
        #[graphql(description = "Updated data for the menu entry")] data: MenuEntryInput,
    ) -> FieldResult<MenuEntry> {
        // Note: In a real implementation, you'd use a mutable database connection
        let mut mock_db = database.clone();
        mock_db
            .update_menu_entry(id, data)
            .ok_or_else(|| format!("MenuEntry with id {} not found", id).into())
    }

    /// Delete a menu entry
    fn delete_menu_entry(
        #[graphql(context)] database: &Database,
        #[graphql(description = "ID of the menu entry to delete")] id: i32,
    ) -> FieldResult<MenuEntry> {
        // Note: In a real implementation, you'd use a mutable database connection
        let mut mock_db = database.clone();
        mock_db
            .delete_menu_entry(id)
            .ok_or_else(|| format!("MenuEntry with id {} not found", id).into())
    }

    /// Create or update a menu entry label
    fn create_or_update_menu_entry_label(
        #[graphql(context)] database: &Database,
        #[graphql(description = "ID of the label to update (optional for create)")] id: Option<i32>,
        #[graphql(description = "Data for the label")] data: MenuEntryLabelInput,
    ) -> FieldResult<MenuEntryLabel> {
        // Note: In a real implementation, you'd use a mutable database connection
        let mut mock_db = database.clone();
        let label = mock_db.create_or_update_menu_entry_label(id, data);
        Ok(label)
    }

    /// Delete a menu entry label
    fn delete_menu_entry_label(
        #[graphql(context)] database: &Database,
        #[graphql(description = "ID of the label to delete")] id: i32,
    ) -> FieldResult<MenuEntryLabel> {
        // Note: In a real implementation, you'd use a mutable database connection
        let mut mock_db = database.clone();
        mock_db
            .delete_menu_entry_label(id)
            .ok_or_else(|| format!("MenuEntryLabel with id {} not found", id).into())
    }
}

// Schema type
pub type Schema = juniper::RootNode<'static, Query, Mutation, juniper::EmptySubscription<Database>>;

pub fn create_schema() -> Schema {
    Schema::new(Query, Mutation, juniper::EmptySubscription::new())
}
