## **Entities** ##

* **Users** [  ]
  * name
  * email
  * password
  * statement
  * created_at
  * updated_at
* **Statements** [  ]
  * id
  * user_id
  * description
  * amount
  * type
  * created_at
  * updated_at

## **Relations** ##
* **Statements_Users** [  ]
  * user_id
  * statement_id
  * created_at
  * updated_at



## **Users** ## 
> **/api/v1/users**
* ### **Post :** ###   
  * ### **[ x ] Unit Test** ###   
  * ### **[ ] Integration Test** ###   

## **Sessions** ##
> **/api/v1/sessions**
* ### **Post :** ###   
  * ### **[ x ] Unit Test** ###   
  * ### **[ ] Integration Test** ###   

## **Profile** ##
> **/api/v1/profile**
* ### **Get :** ###   
  * ### **[ x ] Unit Test** ###   
  * ### **[ ] Integration Test** ###   

## **Statement** ##

> **/api/v1/statements/balance**
* ### **Get :** ###
  * ### **[ x ] Unit Test** ###   
  * ### **[ ] Integration Test** ###   

> **/api/v1/statements/deposit**
* ### **Post :** ###   
  * ### **[ x ] Unit Test** ###   
  * ### **[ ] Integration Test** ###   

> **/api/v1/statements/withdraw**
* ### **Post :** ###   
  * ### **[ x ] Unit Test** ###   
  * ### **[ ] Integration Test** ###   

> **/api/v1/statements/:statement_id**
* ### **Get :** ###   
  * ### **[ x ] Unit Test** ###   
  * ### **[ ] Integration Test** ###   