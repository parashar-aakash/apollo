# Apollo-server 

    1-What is GraphQL?
    2-Difference between GraphQL and Rest.
    3-Write down about Schema and Resolvers.



Introduction to GraphQL

GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.

A GraphQL service is created by defining types and fields on those types, then providing functions for each field on each type. For example, a GraphQL service that tells us who the logged in user is (me) as well as that user's name might look something like this:

type Query {
  me: User
}

type User {
  id: ID
  name: String
}

Along with functions for each field on each type:

function Query_me(request) {
  return request.auth.user;
}

function User_name(user) {
  return user.getName();
}

Once a GraphQL service is running (typically at a URL on a web service), it can be sent GraphQL queries to validate and execute. A received query is first checked to ensure it only refers to the types and fields defined, then runs the provided functions to produce a result.
Schemas and Types

    Type System Because the shape of a GraphQL query closely matches the result, you can predict what the query will return without knowing that much about the server. But it's useful to have an exact description of the data we can ask for - what fields can we select? What kinds of objects might they return? What fields are available on those sub-objects? That's where the schema comes in. Every GraphQL service defines a set of types which completely describe the set of possible data you can query on that service. Then, when queries come in, they are validated and executed against that schema.

    Type language GraphQL services can be written in any language. Since we can't rely on a specific programming language syntax, like JavaScript, to talk about GraphQL schemas, we'll define our own simple language. We'll use the "GraphQL schema language" - it's similar to the query language, and allows us to talk about GraphQL schemas in a language-agnostic way.

    Object types and fields The most basic components of a GraphQL schema are object types, which just represent a kind of object you can fetch from your service, and what fields it has.

type Character {
  name: String!
  appearsIn: [Episode!]!
}

The language is pretty readable, but let's go over it so that we can have a shared vocabulary:

    Character is a GraphQL Object Type, meaning it's a type with some fields. Most of the types in your schema will be object types.
    name and appearsIn are fields on the Character type. That means that name and appearsIn are the only fields that can appear in any part of a GraphQL query that operates on the Character type.
    String is one of the built-in scalar types - these are types that resolve to a single scalar object, and can't have sub-selections in the query. We'll go over scalar types more later.
    String! means that the field is non-nullable, meaning that the GraphQL service promises to always give you a value when you query this field. In the type language, we'll represent those with an exclamation mark.
    [Episode!]! represents an array of Episode objects. Since it is also non-nullable, you can always expect an array (with zero or more items) when you query the appearsIn field. And since Episode! is also non-nullable, you can always expect every item of the array to be an Episode object.

    The Query and Mutation types Every GraphQL service has a query type and may or may not have a mutation type. These types are the same as a regular object type, but they are special because they define the entry point of every GraphQL query.That means that the GraphQL service needs to have a Query type

Mutations work in a similar way - you define fields on the Mutation type, and those are available as the root mutation fields you can call in your query. It's important to remember that other than the special status of being the "entry point" into the schema, the Query and Mutation types are the same as any other GraphQL object type, and their fields work exactly the same way.

    Scalar types A GraphQL object type has a name and fields, but at some point those fields have to resolve to some concrete data. That's where the scalar types come in: they represent the leaves of the query. GraphQL comes with a set of default scalar types out of the box:

    Int: A signed 32‐bit integer.
    Float: A signed double-precision floating-point value.
    String: A UTF‐8 character sequence.
    Boolean: true or false.
    ID: The ID scalar type represents a unique identifier, often used to refetch an object or as the key for a cache. The ID type is serialized in the same way as a String; however, defining it as an ID signifies that it is not intended to be human‐readable.

In most GraphQL service implementations, there is also a way to specify custom scalar types. For example, we could define a Date type:
Resolvers

Resolver is a collection of functions that generate response for a GraphQL query. In simple terms, a resolver acts as a GraphQL query handler. Every resolver function in a GraphQL schema accepts four positional arguments

A Resolver can act in 3 ways

    Query
    Mutation
    Subscription

Query

A GraphQL query is used to read or fetch values

    Fields At its simplest, GraphQL is about asking for specific fields on objects. Let's start by looking at a very simple query and the result we get when we run it:

{
  hero {
    name
  }
}

{
  "data": {
    "hero": {
      "name": "R2-D2"
    }
  }
}

You can see immediately that the query has exactly the same shape as the result. This is essential to GraphQL, because you always get back what you expect, and the server knows exactly what fields the client is asking for.

Oh, one more thing - the query above is interactive. That means you can change it as you like and see the new result.

    Arguments If the only thing we could do was traverse objects and their fields, GraphQL would already be a very useful language for data fetching. But when you add the ability to pass arguments to fields, things get much more interesting. In a system like REST, you can only pass a single set of arguments - the query parameters and URL segments in your request. But in GraphQL, every field and nested object can get its own set of arguments, making GraphQL a complete replacement for making multiple API fetches. You can even pass arguments into scalar fields, to implement data transformations once on the server, instead of on every client separately.

    Fragments Let's say we had a relatively complicated page in our app, which let us look at two heroes side by side, along with their friends. You can imagine that such a query could quickly get complicated, because we would need to repeat the fields at least once - one for each side of the comparison.

That's why GraphQL includes reusable units called fragments. Fragments let you construct sets of fields, and then include them in queries where you need to.

    Variables But in most applications, the arguments to fields will be dynamic: For example, there might be a dropdown that lets you select which Star Wars episode you are interested in, or a search field, or a set of filters.

It wouldn't be a good idea to pass these dynamic arguments directly in the query string, because then our client-side code would need to dynamically manipulate the query string at runtime, and serialize it into a GraphQL-specific format. Instead, GraphQL has a first-class way to factor dynamic values out of the query, and pass them as a separate dictionary. These values are called variables. When we start working with variables, we need to do three things:

    Replace the static value in the query with $variableName
    Declare $variableName as one of the variables accepted by the query
    Pass variableName: value in the separate, transport-specific (usually JSON) variables dictionary

Mutations

n REST, any request might end up causing some side-effects on the server, but by convention it's suggested that one doesn't use GET requests to modify data. GraphQL is similar - technically any query could be implemented to cause a data write. However, it's useful to establish a convention that any operations that cause writes should be sent explicitly via a mutation.

Just like in queries, if the mutation field returns an object type, you can ask for nested fields. This can be useful for fetching the new state of an object after an update.

mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}

{
  "ep": "JEDI",
  "review": {
    "stars": 5,
    "commentary": "This is a great movie!"
  }
}

{
  "data": {
    "createReview": {
      "stars": 5,
      "commentary": "This is a great movie!"
    }
  }
}

Note how createReview field returns the stars and commentary fields of the newly created review. This is especially useful when mutating existing data, for example, when incrementing a field, since we can mutate and query the new value of the field with one request.

You might also notice that, in this example, the review variable we passed in is not a scalar. It's an input object type, a special kind of object type that can be passed in as an argument. Learn more about input types on the Schema page.

    Multiple fields in mutations A mutation can contain multiple fields, just like a query. There's one important distinction between queries and mutations, other than the name: While query fields are executed in parallel, mutation fields run in series, one after the other. This means that if we send two incrementCredits mutations in one request, the first is guaranteed to finish before the second begins, ensuring that we don't end up with a race condition with ourselves.

    Inline Fragments Like many other type systems, GraphQL schemas include the ability to define interfaces and union types. If you are querying a field that returns an interface or a union type, you will need to use inline fragments to access data on the underlying concrete type.

    Meta fields Given that there are some situations where you don't know what type you'll get back from the GraphQL service, you need some way to determine how to handle that data on the client. GraphQL allows you to request __typename, a meta field, at any point in a query to get the name of the object type at that point.

Subscription

In addition to fetching data using queries and modifying data using mutations, the GraphQL spec supports a third operation type, called subscription.

GraphQL subscriptions are a way to push data from the server to the clients that choose to listen to real time messages from the server. Subscriptions are similar to queries in that they specify a set of fields to be delivered to the client, but instead of immediately returning a single answer, a result is sent every time a particular event happens on the server.

A common use case for subscriptions is notifying the client sideabout particular events, for example the creation of a new object, updated fields and so on.

    GraphQL subscriptions have to be defined in the schema, just like queries and mutations:

type Subscription {
  commentAdded(repoFullName: String!): Comment
}

subscription onCommentAdded($repoFullName: String!){
  commentAdded(repoFullName: $repoFullName){
    id
    content
  }
}

{
  "data": {
    "commentAdded": {
      "id": "123",
      "content": "Hello!"
    }
  }
}

In the above example, the server is written to send a new result every time a comment is added on GitHunt for a specific repository. Note that the code above only defines the GraphQL subscription in the schema. Read setting up subscriptions on the client and setting up GraphQL subscriptions for the server to learn how to add subscriptions to your app.

    When to use subscriptions In most cases, intermittent polling or manual refetching are actually the best way to keep your client up to date. So when is a subscription the best option? Subscriptions are especially useful if:

    The initial state is large, but the incremental change sets are small. The starting state can be fetched with a query and subsequently updated through a subscription.
    You care about low-latency updates in the case of specific events, for example in the case of a chat application where users expect to receive new messages in a matter of seconds.

    Client setup The most popular transport for GraphQL subscriptions today is subscriptions-transport-ws. This package is maintained by the Apollo community, but can be used with any client or server GraphQL implementation. In this article, we'll explain how to set it up on the client, but you'll also need a server implementation. You can read about how to use subscriptions with a JavaScript server, or enjoy subscriptions set up out of the box if you are using a GraphQL backend as a service like Graphcool or Scaphold.

    useSubscription Hook The easiest way to bring live data to your UI is by using React Apollo's useSubscription Hook. This lets you render the stream of data from your service directly within your render function of your component! One thing to note, subscriptions are just listeners, they don't request any data when first connected, but only open up a connection to get new data. Binding live data to your UI is as easy.

    Authentication over WebSocket In many cases it is necessary to authenticate clients before allowing them to receive subscription results. To do this, the SubscriptionClient constructor accepts a connectionParams field, which passes a custom object that the server can use to validate the connection before setting up any subscriptions. You can use connectionParams for anything else you might need, not only authentication, and check its payload on the server side with SubscriptionsServer.
