const React = require('react');

function Index(props) {
    return (
        
        <div>
            <h1>Fruits index page</h1>
            <a href="/fruits/new">Create a new fruit here</a>
            <ul>
                {
                    props.fruits.map((fruit) => {
                        return (
                            <li key={fruit._id}>
                               <a href={`/fruits/${fruit._id}`}>{fruit.name}</a> is {fruit.color} 
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

module.exports = Index;