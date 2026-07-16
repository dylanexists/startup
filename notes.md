# CS 260 Notes

I love web programming

This file represents what I have learned about web programming.

- [My startup](https://startup.cs260.click)
- [My simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

I learned that domain names can be an A record, which maps a domain name to an IP address, or a CNAME, which maps one domain name to another domain name. I can use this to, for example, register rentitbest.com and rentitbest.net, with the .com domain being linked to my website's IP and the .net being linked to the .com.

(AI)
Common Troubleshooting Steps for EC2 Status Checks:
- System Check Failed: This is usually an issue with the AWS hardware. The simplest fix is to Stop and Start the instance to migrate it to a healthy host.
- Instance Check Failed: This often indicates an issue with the Operating System (e.g., a corrupted file system or networking driver error).
- Check System Logs: Go to Actions > Monitor and troubleshoot > Get system log to see the boot console output. This often reveals exactly why the OS is stuck.

In Amazon Route 53, domain names are mapped to IP addresses using Resource Records. You have full control to change, redirect, or swap these mappings whenever you like. If I ever wish to map my site's IP to a different domain name I have registered, I can do that.

Forward Proxy vs. Reverse Proxy Table:

Feature             Forward Proxy               Reverse Proxy 
Placement           In front of clients         In front of servers 
Who it hides        The client                  The server 
Common use          Anonymity, filtering        Load balancing, protection 
Awareness           Client knows it's using it  Client is unaware 
Request direction   Client -> Proxy -> Server   Client -> Proxy -> Server

I can obtain, and renew, a web certificate by enabling the ACME protocol for your web server and communicating with Let's Encrypt to generate the needed certificates.

## HTML

| Element | Meaning |
| :--- | :--- |
| `html` | The page container |
| `head` | Header information |
| `title` | Title of the page |
| `meta` | Metadata for the page such as character set or viewport settings |
| `script` | JavaScript reference. Either an external reference, or inline |
| `include` | External content reference |
| `body` | The entire content body of the page |
| `header` | Header of the main content |
| `footer` | Footer of the main content |
| `nav` | Navigational inputs |
| `main` | Main content of the page |
| `section` | A section of the main content |
| `aside` | Aside content from the main content |
| `div` | A block division of content |
| `span` | An inline span of content |
| `h<1-9>` | Text heading. From h1, the highest level, down to h9, the lowest level |
| `p` | A paragraph of text |
| `b` | Bring attention |
| `table` | Table |
| `tr` | Table row |
| `th` | Table header |
| `td` | Table data |
| `ol`, `ul` | Ordered or unordered list |
| `li` | List item |
| `a` | Anchor the text to a hyperlink |
| `img` | Graphical image referenced |
| `dialog` | Interactive component such as a confirmation |
| `form` | A collection of user input |
| `input` | User input field |
| `audio` | Audio content |
| `video` | Video content |
| `svg` | Scalable vector graphic content |
| `iframe` | Inline frame of another HTML page |


| Element | Meaning | Example |
| :--- | :--- | :--- |
| **`form`** | Input container and submission | `<form action="form.html" method="post">` |
| **`fieldset`** | Labeled input grouping | `<fieldset> ... </fieldset>` |
| **`input`** | Multiple types of user input | `<input type="" />` |
| **`select`** | Selection dropdown | `<select><option>1</option></select>` |
| **`optgroup`** | Grouped selection dropdown | `<optgroup><option>1</option></optgroup>` |
| **`option`** | Selection option | `<option selected>option2</option>` |
| **`textarea`** | Multiline text input | `<textarea></textarea>` |
| **`label`** | Individual input label | `<label for="range">Range: </label>` |
| **`output`** | Output of input | `<output for="range">0</output>` |
| **`meter`** | Display value with a known range | `<meter min="0" max="100" value="50"></meter>` |

Because we are not using any CSS for styling we are limited on how visually pleasing our application is. Do not worry about that. At this point we are simply trying to provide structure and content that we will later style and make interactive.
^^ This is the sentence that helped me really internalize the concept of HTML nodes. I basically need to make my structural "endpoints" and their general locations, knowing I can make it look just how I wish in further steps.

### Pages: (dashes are linked pages)

#### Login (email + password login, view rentals if no account)
    -View Rentals
    -User Dashboard
    -Admin Dashboard

#### View Rentals (list of vacant apartments, requires creating account)
    -Register

#### Register (create an account with email + password)
    -User Dashboard

#### User Dashboard (view relevant renter information, submit requests, logout)
    -Request Form
    -Login

#### Request Form (submit requests to admins)
    -User Dashboard

#### Admin Dashboard (see overview of property, inspect apartments/tenants)
    -Apartment Info
    -Login

#### Apartment Info (info on apartment and its tenants + requests)
    -Admin Dashboard

## CSS

Specificity (precedence)
The rules for determining which declaration will apply to a specific element also depend the type of declaration. The following defines the general rules of precedence from highest to lowest.

Inline Styles: style="color: black"
ID Selectors: #myElement { color: blue; }
Class Selectors, Attribute Selectors, and Pseudo-classes: .myClass { color: green; }
Element Selectors and Pseudo-elements: p { color: red; }
Universal Selector (*) and Inherited styles

Bootstrap has been around for longer, is more uniform, and is easier to get started. That being said, Tailwind is less resource-consuming, and has a greater focus on being able to see what your CSS does right on the HTML page, helping developers see the locality of their styling.

## React

JSX is a hybrid of JavaScript and HTML, allowing for HTML-like code to be created inside of my JavaScript.

Vite handles my JSX development by bundling up files and starting my web server, while updating my browser as I write code.

Babel converts JSX into valid JavaScript that and, altough it looks complicated, it is perfectly rendered by a browser.

Single-page web apps load all React components upon startup and dynamically refresh the page with the required tree to give the illusion of going through different pages.

React hooks allow developers to hook into React state, meaning they can store and act upon values we create in React's internal memory, and trigger these changes/queries upon change of state.