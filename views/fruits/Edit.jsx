const React = require('react');

function Edit(props) {
    const { fruit } = props;

    return (
        <div>
            <a href="/fruits">Go back to the Index Page</a>
            <h1>Edit {fruit.name}</h1>
            
            <form action={`/fruits/${fruit._id}?_method=PUT`} method="POST">
                Name: <input type="text" name="name" defaultValue={fruit.name} /><br/>
                Color: <input type="text" name="color" defaultValue={fruit.color} /><br/>
                Is it ready to eat: <input type="checkbox" name="readyToEat" defaultChecked={fruit.readyToEat} /><br/>
                <input type="submit" value="Update Fruit" />
            </form>
        </div>
    );
}

module.exports = Edit;