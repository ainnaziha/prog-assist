import { Assessment, AssessmentType, HeroHeader } from "@/defer/lib/models/contents"
import { Code2, LayoutTemplate, Terminal } from "lucide-react"

/* ====================
[> CUSTOMIZING CONTENT <]
-- Setup image by typing `/image-name.file` (Example: `/header-image.jpg`)
-- Add images by adding files to /public folder
-- Leave blank `` if you don't want to put texts or images
 ==================== */

export const heroHeader: HeroHeader = {
  header: `Skill Assessment Simplified`,
  subheader: `Effortless Evaluation. Tailored Recommendations. Swift and Smart.`,
  image: `/hero-img.webp`,
}

export enum AssessmentCode {
  Frontend = 'frontend',
  Backend = 'backend',
  DataEngineering = 'data-engineering'
}

export const assessmentTypes: AssessmentType[] = [
  {
    icon: LayoutTemplate,
    code: AssessmentCode.Frontend,
    label: 'Frontend Development',
  },
  {
    icon: Terminal,
    code: AssessmentCode.Backend,
    label: 'Backend Skill',
  },
  {
    icon: Code2,
    code: AssessmentCode.DataEngineering,
    label: 'Data Engineering',
  }
]

export const frontEnds: Assessment[] = [
  {
      "question": "How would you rate your proficiency in frontend development?",
      "options": ["Beginner", "Intermediate", "Advanced", "Expert"],
      "answer": null,
      "error": null
  },
  {
      "question": "Do you find the current frontend frameworks/tools compatible with your development needs?",
      "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
      "answer": null,
      "error": null
  },
  {
      "question": "Which aspect of frontend development do you believe contributes most to your current score?",
      "options": ["HTML Structure", "CSS Styling", "JavaScript Interactivity", "Responsive Design", "Other"],
      "answer": null,
      "error": null
  },
  {
      "question": "In what areas do you think you could improve in terms of frontend development?",
      "options": ["CSS Optimization", "JavaScript Performance", "User Experience Design", "Cross-Browser Compatibility", "Other"],
      "answer": null,
      "error": null
  },
  {
      "question": "How likely are you to implement recommendations to enhance your frontend development skills?",
      "options": ["Not Likely at All", "Slightly Likely", "Neutral", "Likely", "Very Likely"],
      "answer": null,
      "error": null
  },
  {
    "question": "What does the 'box model' in CSS describe?",
    "options": ["The layout of HTML elements as rectangular boxes", "A method for creating 3D effects", "The structure of a webpage's content", "A way to organize CSS files"],
    "answer": null,
    "error": null
  },
  {
      "question": "Which CSS property is used to control the spacing between elements?",
      "options": ["margin", "padding", "border", "float"],
      "answer": null,
      "error": null
  },
  {
      "question": "What is the purpose of the 'viewport' meta tag in HTML?",
      "options": ["Defines the viewport properties", "Sets the background color of the webpage", "Embeds external content", "Specifies the character encoding of the document"],
      "answer": null,
      "error": null
  },
  {
      "question": "In JavaScript, what is the purpose of the 'addEventListener' method?",
      "options": ["Attaching an event handler function to an HTML element", "Creating a new HTML element", "Defining a variable", "Executing a loop"],
      "answer": null,
      "error": null
  },
  {
      "question": "Which CSS property is used to make text italic?",
      "options": ["font-style", "text-decoration", "font-weight", "line-height"],
      "answer": null,
      "error": null
  }
]

export const backEnds: Assessment[] = [
  {
      "question": "How would you rate your proficiency in backend development?",
      "options": ["Beginner", "Intermediate", "Advanced", "Expert"],
      "answer": null,
      "error": null
  },
  {
      "question": "Do you find the current backend frameworks/tools compatible with your development needs?",
      "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
      "answer": null,
      "error": null
  },
  {
      "question": "Which aspect of backend development do you believe contributes most to your current score?",
      "options": ["Database Management", "Server-Side Logic", "API Design", "Security", "Other"],
      "answer": null,
      "error": null
  },
  {
      "question": "In what areas do you think you could improve in terms of backend development?",
      "options": ["Optimizing Performance", "Code Efficiency", "Error Handling", "Scalability", "Other"],
      "answer": null,
      "error": null
  },
  {
      "question": "How likely are you to implement recommendations to enhance your backend development skills?",
      "options": ["Not Likely at All", "Slightly Likely", "Neutral", "Likely", "Very Likely"],
      "answer": null,
      "error": null
  },
  {
    "question": "What is the primary purpose of an API in backend development?",
    "options": ["Data Retrieval", "User Interface Design", "Authentication", "Frontend Styling"],
    "answer": null,
    "error": null
  },
  {
      "question": "Which HTTP method is typically used for a read-only operation in RESTful APIs?",
      "options": ["GET", "POST", "PUT", "DELETE"],
      "answer": null,
      "error": null
  },
  {
      "question": "What is the purpose of indexing in a database?",
      "options": ["Improve Query Performance", "Enhance Data Security", "Simplify Data Storage", "Ensure Data Consistency"],
      "answer": null,
      "error": null
  },
  {
      "question": "How would you handle a 500 Internal Server Error in your backend code?",
      "options": ["Log the error and notify administrators", "Display a generic error message to the user", "Ignore the error and continue execution", "Redirect the user to the homepage"],
      "answer": null,
      "error": null
  },
  {
      "question": "What is the role of middleware in a backend application?",
      "options": ["Handle Request/Response Processing", "Manage Frontend Styling", "Authenticate Users", "Store Data in the Database"],
      "answer": null,
      "error": null
  }
]

export const DataEngineerings: Assessment[] = [
  {
      "question": "How would you rate your proficiency in data engineering?",
      "options": ["Beginner", "Intermediate", "Advanced", "Expert"],
      "answer": null,
      "error": null
  },
  {
      "question": "Do you find the current data engineering tools and frameworks compatible with your data processing needs?",
      "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
      "answer": null,
      "error": null
  },
  {
      "question": "Which aspect of data engineering do you believe contributes most to your current score?",
      "options": ["ETL Processes", "Data Warehousing", "Data Modeling", "Data Quality", "Other"],
      "answer": null,
      "error": null
  },
  {
      "question": "In what areas do you think you could improve in terms of data engineering?",
      "options": ["Data Pipeline Optimization", "Big Data Processing", "Database Design", "Data Governance", "Other"],
      "answer": null,
      "error": null
  },
  {
      "question": "How likely are you to implement recommendations to enhance your data engineering skills?",
      "options": ["Not Likely at All", "Slightly Likely", "Neutral", "Likely", "Very Likely"],
      "answer": null,
      "error": null
  },{
    "question": "What is the primary purpose of Extract, Transform, Load (ETL) processes in data engineering?",
    "options": ["Move data from source to destination", "Optimize database queries", "Create interactive visualizations", "Implement machine learning models"],
    "answer": null,
    "error": null
  },
  {
      "question": "Which technology is commonly used for real-time data streaming in data engineering?",
      "options": ["Apache Kafka", "Apache Hadoop", "Spark Streaming", "Flume", "Other"],
      "answer": null,
      "error": null
  },
  {
      "question": "What is the significance of data partitioning in distributed data processing?",
      "options": ["Improves performance by parallelizing computations", "Ensures data consistency", "Minimizes storage space", "Prevents data duplication"],
      "answer": null,
      "error": null
  },
  {
      "question": "How do you handle schema evolution in a data warehouse environment?",
      "options": ["Version control for database schemas", "Automated schema migration tools", "Manual updates as needed", "Data warehouses do not support schema changes"],
      "answer": null,
      "error": null
  },
  {
      "question": "Which database model is commonly used for handling complex and hierarchical data structures in data engineering?",
      "options": ["NoSQL (e.g., MongoDB)", "Relational (e.g., MySQL)", "Graph (e.g., Neo4j)", "In-memory (e.g., Redis)", "Other"],
      "answer": null,
      "error": null
  }
]
