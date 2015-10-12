# PlacementsTeaser

## Running 

* Download / Clone 
* Start a web server
* Open Chrome
* Navigate to src directory in a browser


##Use cases tackled
1. The user should be able browse through the line-item data as either a list or table (ie. pagination or infinite-scrolling).
  * This seemed to be the meat of the data and needed implementing
  * Went with a simple pagination for times sake
2. The user should be able to see each line-item's billable amount (sub-total = actuals + adjustments).
  * Billable amount actually seems more important than actual, booked, or adjustments
3. The user should be able to see the invoice grand-total (sum of each line-item's billable amount).
  * It's supposed to be an invoice so a grand total is pretty important.
4. The user should be able to sort by columns
  * There is a lot of data here, so incorporating ways to find data
5. The user should be able to filter the data (ie. by campaign name, etc., should affect the grand-total).
  * Only filtering by campaign name is implemented.

##Notes

* All numeric values are displayed as currency, that is what I understood the numbers to represent
* I thought that booked and billed were the two most important values for each line item, so I made those stand out. Since adjustments and actual were factors in billed, I added those as information the user got after interacting with a line item, hovering here, so it is not mobile friendly, would need to be shown in a touch environment or visible on tap. Also, if there is no adjustment, then billable equals actual so no extra info is shown.
* I went down the path of filtering by campaign, and I realized there were 400+ campaign names so the model so I decided to make the control an auto complete box. 
* I chose not to go into editing, flagging, adjustments, it was nicer to focus on one area.