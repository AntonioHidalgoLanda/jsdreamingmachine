# Basic Actions
 - Move (Entity:wanderer,Room:from,Room:to)
 - Pick (Actor,item,room)
 - Drop (Actor,item,room)
 - Put (Actor,Furniture,item)
 - Take (Actor,Furniture,item)
 - Inspect (Actor,Room|Actor|Furniture)

 - Information Exchange
	// NPR (Non Playable Roles) May give information for free, but they might want to ask something in exchange
	// there might be features or Knowledge that affects the cost of giving the information
 - Lie
 - <virtual> Exchange   [Feature vs Items]
			// Exchanges (Feature, Item, Knowledge)
			// Cost might be associated to one or more (Feature, Item, Knowledge) of the giver and taker
			// Effects might be caped based on one or more (Feature, Item, Knowledge) of the giver and taker
			// F - F	e.g. rest (Actor:sleeper,Furniture:bed) = sleeper.energy Max(sleeper.topEnergy)+=bed.comfort
			// F - I    e.g. Sell/Buy (Actor:buyer,Actor:seller,seller.item) = buyer.put(seller.item) + seller.money += seller.thought(cost_item) + ....
			// F - K	e.g. Bribe
			// I - I	
			// I - K	e.g. Bribe
			// K - K	e.g. Discuss
 		+ Buy
		+ Sell
		+ Fight
		+ Health
		+ Rest (+energy,-time)
 - <visrtual> freeMeal
		+ Refresh
		+ Sleep
 - consume
		+ Kill
 - Play
	// Run a gift/video/flash which has a return value (1=wins, 1=no_wins)
	// On the return there are 2 reward functions, one for win, another for no win

 

