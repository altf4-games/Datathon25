# AdFlow.AI (Datathon25)

AdFlow.AI is an AI-driven marketing platform tailored to the needs of Indian businesses and marketers. It helps users create, analyze, and optimize marketing campaigns with a focus on personalized, festival-aware, and data-driven strategies.

## Features

- **AI-Driven Insights:** Harnesses AI to extract actionable insights from complex marketing data for better decision-making.
- **Automated Campaign Generation:** Easily generate campaign plans and creative content (text and images) using AI, including prompt-to-image capabilities.
- **Personalization:** Delivers personalized marketing plans and recommendations based on user input and Indian consumer behavior.
- **Location-Based Targeting:** Utilize AI to design campaigns for specific cities or regions.
- **Festival Awareness:** Automatically aligns campaigns with major Indian festivals for maximum impact.
- **Analytics Dashboard:** Visualizes key metrics like engagement, likes, reposts, and more, helping users monitor campaign performance.
- **Telegram Bot Integration:** Users can interact with the platform and generate campaigns through Telegram.
- **Modern UI:** Clean, responsive React interface with TailwindCSS and React Icons.

## Project Structure

- **Frontend:**  
  - Located in `src/`  
  - Built with React (JSX), styled using TailwindCSS  
  - Main pages:  
    - `LandingPage.jsx` – Hero, features, and CTA  
    - `Plans.jsx` – Campaign plan generation form and output  
    - `MarketingAnalysis.jsx` – Analytics dashboard with charts and metrics  
    - `Features.jsx` – Detailed feature sections  
    - `ContactUs.jsx` – Contact form and platform info  
    - UI components in `src/components/ui/` (Sidebar, Footer, etc.)

- **Backend:**  
  - Located in `api/`  
  - Handles AI integrations and campaign generation logic  
  - Connects to:  
    - **Google Gemini (Generative AI)** for campaign text/content generation  
    - **Hugging Face** for inference tasks  
    - **Bluesky Social** for social posting  
    - **Telegram Bot** for campaign generation via chat  
  - Festival awareness for Indian context (Diwali, Holi, etc.)  
  - Prompts are dynamically built based on user input and current festival

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- [Google Gemini API Key](https://ai.google.dev/)
- (Optional) Hugging Face API Key
- (Optional) Telegram Bot Token

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/altf4-games/Datathon25.git
   cd Datathon25
   ```

2. **Install dependencies:**
   - For frontend:
     ```bash
     cd src
     npm install
     ```
   - For backend:
     ```bash
     cd ../api
     npm install
     ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` in the `api` directory.
   - Add your **Google Gemini API key** and other credentials as needed.

## Usage

- **Generate Campaigns:**  
  Fill out the campaign form on the Plans page; the backend will use Gemini to generate creative plans based on your inputs.
- **Analyze Results:**  
  View analytics in the Marketing Analysis dashboard.
- **Interact via Telegram:**  
  Use the Telegram bot to generate campaigns on the go.

---

**AdFlow.AI – Smarter, localized, festival-aware marketing for India.**
