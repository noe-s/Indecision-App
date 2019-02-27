/* React notes
- components MUST have:
    -capital class/component name
    -have a render function

-React props.
    -like HTML tag info (i.e. id="..",class="..")
    -Though can be arbitrary (i.e. title, desc, pistache)
    - **'this.props' accesses this info**
    - i.e. {this.props.title}

- This keyword/this-binding
    -context of this not transfered beyond methods, etc.
    -use .bind(x), where 'x' is the context of this.
    -Can also force other things on it: .bind({name: greg});

-Component States
    -Allows components to manage data
    -Steps to follow:
        1) Setup default state object:
            i.e. <Counter />
                {count: 0}
        2) Component rendered w/ default state values (i.e. 0).
        3) Change state based on event (i.e. 0 + 1 -> 1);
        4) Component re-rendered using new state values
        5) Start again at 3

-Props Vs. State
    -BOTH:
        -Are objects
        -Can be used when rendering
        -Changes to both cause rerendering
    -Props come from above, while state is defined in component itself
    -Props Can't be changed by component itself
    -State can be changed by component itself
-Life-cycle components
    - only in class based components (not stateless)
    - why stateless is so fast (no state or lifecycle)
    -examples:
        -componentDidMount: does something when component is rendered * (fetch data)
        -componentDidUpdate: does something when state or prop value changes (i.e. info input) (save data)
            -can access prevProps, prevState (as input)
        -ComponentWillUnmount: does something just before component goes away
            -Triggered when whole page is rerendered to something new
*/

class IndecisionApp extends React.Component{ //Parent component to nest others
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state ={
            options: []
        };
    }
    componentDidMount(){
        try{ 
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options){ //avoid nulls seting the state
                this.setState(() => ({options: options}));
            }
        } catch(e){
            //Do nothing al all
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length !== this.state.options.length){ //chack if length actually changed from prev
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
            console.log('saving data'); 
        }
    }
    componentWillUnmount(){

    }
    handleDeleteOptions(){
        this.setState(() => ({ options: [] })); //shorthand setState to return object.
    }
    handleDeleteOption(optionToRemove){
        this.setState((prevState) => ({ 
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    }
    handlePick(){
        this.setState(()=>{
            const randomNum = Math.floor(Math.random() *this.state.options.length);//random num func.
            const option = this.state.options[randomNum];
            alert(option);
        });
    }
    handleAddOption(option){
        if(!option){ //if empty string
            return 'Enter valid value to add item';
        }else if(this.state.options.indexOf(option) > -1){
            return 'This option already exists';
        }
        this.setState((prevState) => ({options: prevState.options.concat([option])}));
    }
    render(){
        const subtitle = 'Make mundane decisions easier!';
        return(
            <div>
                <Header subtitle={subtitle} />
                <Action 
                hasOptions={this.state.options.length > 0}
                handlePick={this.handlePick}
                />
                <Options 
                options={this.state.options}
                handleDeleteOptions={this.handleDeleteOptions}
                handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption 
                    handleAddOption={this.handleAddOption}
                />
            </div>
        );
    }
}
const Header = (props) => {
    return(
        <div>
          <h1>{props.title}</h1>
          {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>  
      );
};

Header.defaultProps ={
    title: 'Indecision'

};

const Action = (props) => {
    return(
        <div>
            <button onClick={props.handlePick} 
            disabled={!props.hasOptions}
            >
            What should I do?
            </button>
        </div>
    );
};
const Options =(props)=>{
    return(
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {props.options.length === 0 && <p>Please add an option to get to get started!</p>}
            {
                props.options.map((option) => (
                    <Option 
                        key={option} 
                        optionText={option}
                        handleDeleteOption={props.handleDeleteOption}/>
                    ))
            }
        </div>
    );
};
const Option = (props) => {
    return( //accesses the prop from Options above.
        <div>
            {props.optionText}
            <button 
                onClick={(e) => {
                    props.handleDeleteOption(props.optionText);
                }}
                >
                remove
            </button>
        </div>
    );
}
class AddOption extends React.Component{
    constructor(props){
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = { //define state for form
            error: undefined
        }
    }
    handleAddOption(e){
        e.preventDefault(); //prevent full page refresh

        const option = e.target.elements.option.value.trim(); //trim removes before & after spaces
        const error = this.props.handleAddOption(option);

        this.setState(()=>({ error }));

        if(!error){
            e.target.elements.option.value = ''; //wipe input
        }
    }
    render(){
        return(
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" />
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}
/*
const User = (props) => {
    return(
        <div>
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
        </div>
    );
};
*/

ReactDOM.render(<IndecisionApp />, document.getElementById('app')); //first arg is the parent component