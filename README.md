# Pinnacle-Pages

Pinnacle-Pages is a simple blogging web application built with Express.js and EJS. This project allows users to create, view, edit, and delete blog posts. Each post consists of a heading, description, content, and a thumbnail image.

## Features

- **Create New Posts**: Users can create new blog posts with a heading, description, content, and thumbnail.
- **View Posts**: Users can view all created posts on the homepage.
- **Edit Posts**: Users can edit existing posts.
- **Delete Posts**: Users can delete posts.

## Prerequisites

- Node.js and npm installed on your local machine.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Shareencoco/Pinnacle-Pages.git
   cd Pinnacle-Pages
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the application**:
   ```bash
   npm start
   ```

4. **Open your browser and navigate to**:
   ```bash
   http://localhost:3000
   ```

## Project Structure

```
Pinnacle-Pages/
├── public/              # Static files (CSS, images, etc.)
├── views/               # EJS templates
│   ├── index.ejs        # Homepage view
│   ├── createpost.ejs   # View for creating a new post
│   ├── editpost.ejs     # View for editing a post
│   ├── viewpost.ejs     # View for displaying a single post
│   ├── header.ejs       # HTML head
│   └── footer.ejs       # Footer
├── index.js             # Main application file
├── package.json         # Project metadata and dependencies
└── README.md            # Project documentation
```

## Usage

### Creating a New Post

1. Click on the "Create New" button on the homepage.
2. Fill in the heading, description, content, and thumbnail fields.
3. Click the "Create" button to add the post.

### Viewing a Post

- All posts are listed on the homepage. Click on a post to view its details.

### Editing a Post

1. Click on the "Edit" button below the post you want to edit.
2. Update the fields as needed.
3. Click the "Update" button to save the changes.

### Deleting a Post

1. Click on the "Delete" button below to the post you want to delete.

## Code Highlights

### Adding a New Post

In `app.js`:
```javascript
app.post("/create-post", (req, res) => {
    const newPost = {
        id: posts.length + 1,
        heading: req.body.heading,
        description: req.body.desc,
        content: req.body.content,
        thumbnail: req.body.thumbnail // Assuming thumbnail is a URL or base64 string
    };
    posts.push(newPost);
    res.redirect("/");
});
```

### Deleting a Post

In `app.js`:
```javascript
app.delete("/delete-post/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter(post => post.id !== postId);
    res.redirect("/");
});
```

### Editing a Post

In `app.js`:
```javascript
app.patch("/update-post/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
        posts[postIndex] = {
            id: postId,
            heading: req.body.heading,
            description: req.body.desc,
            content: req.body.content,
            thumbnail: req.body.thumbnail // Assuming thumbnail is a URL or base64 string
        };
        res.redirect("/");
    } 
});
```

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any changes.

## Acknowledgements

- Thanks to the Express.js and EJS teams for their wonderful tools.

