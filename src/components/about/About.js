import React, {Component} from 'react';

export default class AboutPage extends Component{
    render(){
        return (<div>
            <h1>About</h1>
            <p>This app is meant to facilitate community-building by giving users the 
                infrastructure to both combine resources, friendly donation and barter for goods and services. 
                Someone with only a few dollars of disposable income might need to save up 
                for months to afford new shoes or to fix a broken appliance, but if many people 
                pool their resources, they can take turns buying what they need. We plan for this app 
                to be usable by small communities around the world, not just in the United States.
            </p>
            <p> Since this app is first and foremost about building a sense of community 
                between people without much to spare, we also support in-group chatting and bartering . 
                We hope to ameliorate language barriers by allowing users to select their preferred 
                language and provide them the option to use google translate to automatically translate 
                other languages used in chat into their language of choice. We also plan to provide users 
                a way to find the item on their wishlist as cheaply as possible. 
            </p>
            <p>Our research didn’t turn up any similar apps; this seems to be a problem that isn’t well solved
                 at the moment. Personal shopper apps exist, but they tend to target high-end users, 
                 and none integrate bartering or fund sharing which are features uniquely beneficial to 
                 the group we intend to service.</p>
            <p>This app is created by Alissa Adornato &amp; Emily Ding &amp; William Fu &amp; Hao Chen for
                INFO343 <em>Client-Side Web Development</em> Final Project
            </p>
        </div>);
    }
}