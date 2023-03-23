
#  Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

  

- Data is saved in the database in the Facilities, Agents, and Shifts tables

- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each

- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

  

##  You've been asked to work on a ticket. It reads:

  

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

  
  

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

  
  

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

  

##  Your Breakdown Here

### **Ticket 1**
**Title**: *Create a new colum in the Agents table to store the custom Agent ID*
**Description**: The current resports beign generated use the Primary key ID from the Agents table to identify each Agent. The request is to have a custom ID that Facilities can define for each agent, this ID must be unique.
**Effort Estimate**: 1
**Acceptance Criteria**: 
 - New column available in the Agents table 'custom_agent_id';
 - This column must have unique values;
 - This must be a varchar field with a max size of 50 characters.
 - This column cannot be null/empty (check task 2 first, to activate this validation after the migration);

### **Ticket 2**
**Title**: *Create a migration script to fill all Agents without a CustomID*
**Description**: Since the new 'custom_agent_id' cannot be null/empty (check ticket 1), we must create a migration script to fill all the customIds for existing Agents.
**Effort Estimate**: 1
**Acceptance Criteria**: 
 - A script that updates the column 'custom_agent_id' from Agents table.
 - The generated value must be the the following: `AgentsName + "_" + FacilityId + "_" randomHash`
 - Please make sure that this string does not have more than 50 characteres.
 - Return to task 1 to active the validation to not allow this field to be empty for future updates/inserts
 - 
### **Ticket 3**
**Title**: *Change the Facilities UI to add a new CustomID field when creating or updating a new Agent*
**Description**: Change the current Facility UI form to create/update Agents to contains the new `Custom Agent ID` field. This field must be required and cannot have less than 5 characteres and more than 50.
**Effort Estimate**: 3
**Acceptance Criteria**: 
 - A new input field in the Facility's admin page, when creating or editing an Agent, with the name "Custom Agent ID"
 - Add a tooltip in this field with the following text: This value serves as a unique identifier for each agent and is used in report generation. It is essential that each agent has a distinct identifier to avoid any confusion in the generated reports.
 - Add the folowing validations: Cannot have less than 5 characters and more than 50; Cannot be null/undefined; the only allowed special character is undescore `_`.
 - Validate using the API service to make sure that this is a unique ID, if the API returns BAD_REQUEST , user cannot update the Agent's profile.
 
### **Ticket 4**
**Title**: *Change the Facilities API service to validate and save the customAgentID*
**Description**: Change the API service that saves the Agent information to validate if the custom_agent_id is unique and update the Agent's row in the DB.
**Effort Estimate**: 3
**Acceptance Criteria**: 
 - Add a new parameter to the payload of the service POST/PUT `agent/:agentId` called custom_agent_id;
 - Before saving, check if this ID is unique in the database, if not, return a 400 BAD_REQUEST error to the requester;
 - If it is unique, update/create the Agent's row in the database table `Agents`.
 - Since this can have parallel calls, please make sure to do a Conditional Update to avoid concurrency issues, if the conditional update returns false, return 400 BAD_REQUEST to the requester;
 - 
### **Ticket 5**
**Title**: *Change the Reports generation API to use the new CustomAgentID field as identifier*
**Description**: Change the current `generateReport` function to use the new custom_agent_id column from the database to generante the report, instead of the Primary Key from the table.
**Effort Estimate**: 2
**Acceptance Criteria**: 
 - The generated reports must keep the same PDF formatting;
 - The ID column must now contains the value from the custom_agent_id table, instead of the Primary Key value.