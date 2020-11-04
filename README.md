# **GitHub Issues** <!-- omit in toc -->

A repository to practice React, React-Hooks, React-Router React-Bootstrap, and React-markdown.

- [**General**](#general)
- [**How it works**](#how-it-works)
- [**Requirements**](#requirements)
- [**What I Learned**](#what-i-learned)
- [**Still Todo**](#still-todo)

## **General**

The React GitHub Issues App was created using the following languages and technologies:

<img src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
<img src="https://img.shields.io/badge/bootstrap%20-%23563D7C.svg?&style=for-the-badge&logo=bootstrap&logoColor=white"/>
<img src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
<img src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/>

## **How it works**

This app uses the React-Router package in connection with the GitHub issues API to analyze the URL and display different issue components depending on user input.

In App.js:
```JSX
    <Route exact path="/issues" component={IssueList}/>
    <Route path="/labels/:name" component={IssuesByLabel}/>
    <Route path="/issues/detail/:number" component={IssueDetail}/>
```

In the issueDetail Component:
```JavaScript
    const {number} = useParams();
    const [detailData, setDetailData] = useState(null);
    const loadIssueDetail = () => {
        fetch(`https://api.github.com/repos/facebook/create-react-app/issues/${number}`)
            .then(res => res.json())
            .then(data => setDetailData(data))
    }
    useEffect(() => {
        loadIssueDetail();
    }, [])
```
<!-- 
## **How to Use**
* Add a gif
 -->

## **Requirements**
The Requirements for this exercise were as follows: 
* Using our newfound React-knowledge, try to recreate the github issues page as best as possible.


## **What I Learned**
* Implementation of React Hooks
  * Using functional vs. class components.
    * Prior to this exercise, the course had only taught us to use class components.
    * Although they are extremely similar, I lean towards using hooks for their conciseness.
* Using the React-Router package
  * Prior to this exercise, there was a glaring similarity between all of the react apps the class was tasked with creating...they were all one page.
    * React-Router solves this problem by allowing us to create different routes (similar to how we did on the backend) that will link the user to different components.
* Using the React-Markdown package
  * The GitHub issues API returned a multitude of data when called. For each individual issue detail the API returned a large string of text that upon investigation had some markdown markup already included.
  * To take advantage of this styling I installed/used React-Markdown.
  * This library provides the React component to render the Markdown markup.
```JSX
<ReactMarkdown source={detailData.body} />
```

## **Still Todo**
* Implement a backend using express
* Continue to style the components
