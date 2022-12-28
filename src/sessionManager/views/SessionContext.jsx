import React from "react";

const Context = React.createContext({});

export class SessionProvider extends React.Component {
    
    
    
    render() {
        return (
            <Context.Provider value={""}>
                {this.props.children}
            </Context.Provider>
        );
    }
}