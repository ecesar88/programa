pub mod menu_schema;

pub use menu_schema::{
    Database, MenuEntry, MenuEntryCategory, MenuEntryInput, MenuEntryLabel, MenuEntryLabelInput,
    MenuEntryVariant, MenuEntryVariantInput, MenuEntryCategoryInput, Mutation, Query, Schema,
    create_schema, RecordNotFoundError,
};
