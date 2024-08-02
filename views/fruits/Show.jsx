const React = require('react')

function Show(props) {
    return(
        <div>
            <h1>{props.fruit.name}</h1>
            <a href="/fruits/New">Create a new entry</a><br/>
            <a href="/fruits">Go back to the Index Page</a>
            <p>
               The {props.fruit.name} is {props.fruit.color} and {props.fruit.readyToEat? 'it is ready to eat' : 'it is not ready to eat'}
            </p>
            <p>
                It's ID is {props.fruit.id}
            </p>
            <form action={`/fruits/${props.fruit.id}/?_method=DELETE`} method="POST" >
            <button type="submit">Delete this fruit</button>
            </form>
            <form action={`/fruits/${props.fruit.id}/edit`}>
               <button type="submit">Edit Fruit</button>
            </form>
        </div>
    )
}

module.exports = Show