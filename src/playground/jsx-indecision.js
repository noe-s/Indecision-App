console.log('App.js is running');
 
var app={
    title: 'The Indecision App!',
    subtitle:'This app will help you make mundane life decisions...Yay!',
    options: ['One','Two']
};
var template = (
<div>
    <h1>{app.title}</h1>
    {app.subtitle && <p>{app.subtitle}</p>}
    <p>{app.options.length > 0 ? 'Here are your Options:' : 'No Options'}</p>
    <ol>
        <li>{app.options[0]}</li>
        <li>{app.options[1]}</li>
    </ol>
</div>
);

var user ={
    name: 'Noe',
    age: 22,
    location: 'Montreal'
};

function getLocation(location){
    if(location){
        return <p>Location: {location}</p>;
    }
}
var temp2=(
<div>
    <h1>{user.name ? user.name : 'Anonymous'}</h1>
    {(user.age && user.age >= 18) && <p>Age: {user.age}</p>}
    {getLocation(user.location)}
</div>
);


var appRoot = document.getElementById('app');//Access DOM element in html

ReactDOM.render(template,appRoot);//takes 2 args: JSX you want to render, and where to render it (DOM)