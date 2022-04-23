# dev-blog

A Development Blog for Any Project

## Start

To run the dev blog run the following command:

`npm run dev`

Then navigate to http://localhost:3001

## Creating a Blog Post

All blog posts are written as [markdown](https://www.markdownguide.org/) files (text files that end with `.md`). To create a new blog post, add a new markdown file to the `static/posts/` directory. If you want the post to appear in a category, simply place it in a new subfolder with the name of your category.

## Tips

### Dating Your Posts

A simple way of organizing your posts by date is to place each post in a category with the name as the date of the post. If you use the ISO date format (yyyy-mm-dd), your post categories will be properly sorted by date when viewing them on the blog.

### Adding Images and Other Linked Content

If you want to link local content in your post, you can place the content file anywhere in the `static/` directory and reference it in your markdown file. Here's an example of adding an image to your post:

1. Add the image file (cats.png) to the static directory at `static/cats.png`
2. Reference it in your markdown like so: `[!Cats](/cats.png)`
3. View it in your post!
