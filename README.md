# Lighting Search using (GraphQL)

This repository contains a generic Lightning Search utility built using the Salesforce GraphQL Wire Adapter, specifically the lightning/uiGraphQLApi, from Lightning Web Components. It provides a workaround for dynamically constructing GraphQL queries at runtime, such as referencing a fragment from another component.

## Table of Contents
- [Deployment](#deployment)
- [Configuration](#configuration)
- [Resources](#resources)

## Deployment
If you're planning to deploy your changes, you have two options to consider:
- Set of Changes: Deploy a specific set of changes.
- Self-contained Application: Create a self-contained application. For more information on the available development models, refer to the [development model documentation](https://developer.salesforce.com/tools/vscode/en/user-guide/development-models).

## Configuration
The `sfdx-project.json` file in this project contains important configuration information. Please refer to the [Salesforce DX Project Configuration documentation](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_config.htm) in the Salesforce DX Developer Guide to learn more about this file and its configuration options.

## Resources
To get started and learn more about the GraphQL API and the lightning/uiGraphQLApi Wire Adapters, please refer to the following resources:
- [Get Started with GraphQL API](https://developer.salesforce.com/docs/platform/graphql/guide)
- [lightning/uiGraphQLApi Wire Adapters](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_lightning_graphql_api)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)

Feel free to explore these resources to gain a deeper understanding of GraphQL and the specific functionalities provided by the Salesforce GraphQL Wire Adapter.