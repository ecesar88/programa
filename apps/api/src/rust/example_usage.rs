use crate::menu_schema::{create_schema, Database};
use juniper::{execute, Variables, Value};

pub async fn example_usage() {
    // Create the database context
    let mut database = Database::new();
    
    // Create the GraphQL schema
    let schema = create_schema();
    
    // Example query: Get all menu entries
    let query = r#"
        query {
            getAllMenuEntries {
                id
                name
                description
                variants {
                    id
                    name
                    description
                    price
                }
                labels {
                    id
                    name
                    color
                }
                categories {
                    id
                    name
                }
            }
        }
    "#;
    
    let result = execute(query, None, &schema, &Variables::new(), &database).await;
    match result {
        Ok((value, _errors)) => {
            println!("Query result: {:#}", value);
        }
        Err(e) => {
            println!("Query error: {:?}", e);
        }
    }
    
    // Example mutation: Create a new menu entry
    let mutation = r#"
        mutation {
            createMenuEntry(data: {
                name: "Caesar Salad"
                description: "Fresh romaine lettuce with caesar dressing"
                variants: [{
                    name: "Regular"
                    description: "Standard portion"
                    price: 14.99
                }]
                labels: [{
                    name: "Healthy"
                    color: "#8BC34A"
                }]
                categories: [{
                    name: "Salads"
                }]
            }) {
                id
                name
                description
                variants {
                    id
                    name
                    price
                }
                labels {
                    id
                    name
                    color
                }
                categories {
                    id
                    name
                }
            }
        }
    "#;
    
    let result = execute(mutation, None, &schema, &Variables::new(), &mut database).await;
    match result {
        Ok((value, _errors)) => {
            println!("Mutation result: {:#}", value);
        }
        Err(e) => {
            println!("Mutation error: {:?}", e);
        }
    }
    
    // Example query: Search for labels
    let search_query = r#"
        query {
            searchMenuEntryLabels(searchTerm: "Vegetarian") {
                id
                name
                color
            }
        }
    "#;
    
    let result = execute(search_query, None, &schema, &Variables::new(), &database).await;
    match result {
        Ok((value, _errors)) => {
            println!("Search result: {:#}", value);
        }
        Err(e) => {
            println!("Search error: {:?}", e);
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use juniper::execute;
    
    #[tokio::test]
    async fn test_get_all_menu_entries() {
        let database = Database::new();
        let schema = create_schema();
        
        let query = r#"
            query {
                getAllMenuEntries {
                    id
                    name
                }
            }
        "#;
        
        let result = execute(query, None, &schema, &Variables::new(), &database).await;
        assert!(result.is_ok());
        
        let (value, errors) = result.unwrap();
        assert!(errors.is_empty());
        
        // Check that we have at least one menu entry from the seed data
        if let Value::Object(obj) = &value {
            if let Some(Value::Object(data)) = obj.get("data") {
                if let Some(Value::List(entries)) = data.get("getAllMenuEntries") {
                    assert!(!entries.is_empty());
                }
            }
        }
    }
    
    #[tokio::test]
    async fn test_create_menu_entry() {
        let mut database = Database::new();
        let schema = create_schema();
        
        let mutation = r#"
            mutation {
                createMenuEntry(data: {
                    name: "Test Dish"
                    description: "A test dish"
                }) {
                    id
                    name
                    description
                }
            }
        "#;
        
        let result = execute(mutation, None, &schema, &Variables::new(), &mut database).await;
        assert!(result.is_ok());
        
        let (value, errors) = result.unwrap();
        assert!(errors.is_empty());
        
        // Verify the created entry
        if let Value::Object(obj) = &value {
            if let Some(Value::Object(data)) = obj.get("data") {
                if let Some(Value::Object(entry)) = data.get("createMenuEntry") {
                    if let Some(Value::Scalar(name)) = entry.get("name") {
                        assert_eq!(name.as_str(), Some("Test Dish"));
                    }
                }
            }
        }
    }
}
