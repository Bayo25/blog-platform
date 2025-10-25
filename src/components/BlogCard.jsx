import { Link } from "react-router-dom"


const BlogCard = () => {
  return (
    <main>
      <section aria-label="card" className="shadow-xs h-[250px] w-[250px]">
        <h1>title</h1>
        <p>body</p>

        <section>
          <Link to={'/edit-blog'}>
            <button className="bg-blue-300 text-white">edit</button>
          </Link>
          <button className="bg-red-500 text-white">delete</button>
        </section>
      </section>
    </main>
  )
}

export default BlogCard