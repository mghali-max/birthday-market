// src/SurveyPage.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";

export default function SurveyPage() {
  const navigate = useNavigate();

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [postSurveyPlan, setPostSurveyPlan] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // super-light "must complete" rules for now
    if (!postSurveyPlan) {
      setError("Please tell us if you plan to complete the post-celebration survey.");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the terms of use to continue.");
      return;
    }

    setError("");

    // later we can persist the answers somewhere.
    // For now, move on to the next step in the flow.
    navigate("/");
  };

  return (
    <div className="screen">
      {/* HEADER: same structure as LoginPage */}
      <header className="header">
        <div className="home-header-row home-header-row1">
          <div className="header-left" />
          <div className="header-center login-header-center">
            <img
              src={logo}
              alt="Birthday Connections"
              className="logo-img header-logo"
            />
          </div>
          <div className="header-right-spacer" />
        </div>
      </header>

      <main className="survey-content">
        <h2 className="survey-title">Tell Us About Your Child</h2>
        <p className="survey-subtitle">
          Welcome to your no-cost shopping experience!
        </p>

        <p className="survey-paragraph">
          As the parent or caretaker, you will choose the birthday gifts and
          sweet treat you want to give your child. In addition, you will
          receive party supplies.
        </p>
        <p className="survey-paragraph">
          To get started, please complete the following information. Be sure to
          complete the entire shopping process at one time. If you leave, you
          will need to start again from the beginning.
        </p>

        <p className="survey-note">* All form fields are required</p>

        <form className="survey-form" onSubmit={handleSubmit}>
          {/* DIETARY NEEDS */}
          <section className="survey-section">
            <h3 className="survey-section-title">Dietary needs</h3>
            <div className="survey-checkbox-grid">
              <label className="survey-checkbox">
                <input type="checkbox" name="dietary" value="none" /> No dietary
                restrictions
              </label>
              <label className="survey-checkbox">
                <input type="checkbox" name="dietary" value="gluten" /> No
                gluten
              </label>
              <label className="survey-checkbox">
                <input type="checkbox" name="dietary" value="dairy" /> No dairy
              </label>
              <label className="survey-checkbox">
                <input type="checkbox" name="dietary" value="eggs" /> No eggs
              </label>
              <label className="survey-checkbox">
                <input type="checkbox" name="dietary" value="nuts" /> Nut
                allergy
              </label>
            </div>
          </section>

          {/* BIRTHDAY / AGE / HOUSEHOLD / ETHNICITY */}
          <section className="survey-section survey-grid-2">
            <div className="survey-field-group">
              <label className="survey-label">
                Your child&apos;s birthday
                <div className="survey-inline-selects">
                  <select className="survey-select" required>
                    <option value="">Month</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                    <option>September</option>
                    <option>October</option>
                    <option>November</option>
                    <option>December</option>
                  </select>
                  <select className="survey-select" required>
                    <option value="">Day</option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
              </label>
            </div>

            <div className="survey-field-group">
              <label className="survey-label">
                Age your child will turn
                <select className="survey-select" required>
                  <option value="">Select age</option>
                  {Array.from({ length: 18 }, (_, i) => (
                    <option key={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="survey-field-group">
              <label className="survey-label">
                Head of household
                <select className="survey-select" required>
                  <option value="">Select</option>
                  <option>Mother</option>
                  <option>Father</option>
                  <option>Both parents</option>
                  <option>Grandparent</option>
                  <option>Other guardian</option>
                </select>
              </label>
            </div>

            <div className="survey-field-group">
              <label className="survey-label">
                Child&apos;s ethnicity
                <select className="survey-select" required>
                  <option value="">Select child&apos;s ethnicity</option>
                  <option>Black / African American</option>
                  <option>Hispanic / Latino</option>
                  <option>White</option>
                  <option>Asian</option>
                  <option>Native American / Indigenous</option>
                  <option>Multiracial</option>
                  <option>Other / Prefer not to say</option>
                </select>
              </label>
            </div>
          </section>

          {/* BARRIERS */}
          <section className="survey-section">
            <h3 className="survey-section-title">
              What barriers prevent you from having the resources to celebrate
              your child&apos;s birthday? (Choose all that apply.)
            </h3>
            <div className="survey-checkbox-grid">
              <label className="survey-checkbox">
                <input type="checkbox" name="barriers" value="financial" />{" "}
                Financial
              </label>
              <label className="survey-checkbox">
                <input type="checkbox" name="barriers" value="health" /> Health
              </label>
              <label className="survey-checkbox">
                <input type="checkbox" name="barriers" value="environment" />{" "}
                Environment
              </label>
              <label className="survey-checkbox">
                <input type="checkbox" name="barriers" value="work" /> Work
              </label>
              <label className="survey-checkbox">
                <input type="checkbox" name="barriers" value="none" /> No
                barriers
              </label>
            </div>
          </section>

          {/* EMOTIONAL IMPACT */}
          <section className="survey-section">
            <h3 className="survey-section-title">
              Describe how having access to the birthday resources here in the
              Birthday Market impacts you emotionally. (Choose all that apply.)
            </h3>
            <div className="survey-checkbox-grid">
              <label className="survey-checkbox">
                <input type="checkbox" name="impact" value="relief" /> Feelings
                of relief
              </label>
              <label className="survey-checkbox">
                <input type="checkbox" name="impact" value="confidence" /> Gives
                me a stronger sense of confidence
              </label>
              <label className="survey-checkbox">
                <input type="checkbox" name="impact" value="family" /> Family
                bonding will be strengthened
              </label>
              <label className="survey-checkbox">
                <input type="checkbox" name="impact" value="stress" /> Stress
                reduced knowing there are resources
              </label>
              <label className="survey-checkbox">
                <input type="checkbox" name="impact" value="happiness" /> My
                overall happiness and joy are increased
              </label>
            </div>
          </section>

          {/* ITEMS IMPORTANT */}
          <section className="survey-section">
            <h3 className="survey-section-title">
              Which of the following items are important to you to celebrate
              your child&apos;s birthday? (Choose all that apply.)
            </h3>
            <div className="survey-checkbox-grid">
              <label className="survey-checkbox">
                <input type="checkbox" name="important" value="delivery" /> Gifts
                delivered to me by my case manager
              </label>
              <label className="survey-checkbox">
                <input type="checkbox" name="important" value="planning" />{" "}
                Planning the birthday party
              </label>
              <label className="survey-checkbox">
                <input type="checkbox" name="important" value="gifts" /> Birthday
                gifts
              </label>
              <label className="survey-checkbox">
                <input type="checkbox" name="important" value="card" /> Birthday
                card
              </label>
              <label className="survey-checkbox">
                <input type="checkbox" name="important" value="book" /> Book
              </label>
              <label className="survey-checkbox">
                <input type="checkbox" name="important" value="treat" /> Sweet
                treat – cookies or cake
              </label>
              <label className="survey-checkbox">
                <input type="checkbox" name="important" value="supplies" /> Party
                supplies – plates, etc.
              </label>
            </div>
          </section>

          {/* FREE-TEXT RESPONSE */}
          <section className="survey-section">
            <h3 className="survey-section-title">
              Please share how you expect your child will respond to receiving
              gifts and a sweet treat.
            </h3>
            <textarea
              className="survey-textarea"
              rows={4}
              placeholder="Enter text"
              required
            />
          </section>

          {/* POST CELEBRATION SURVEY */}
          <section className="survey-section">
            <h3 className="survey-section-title">
              After you celebrate your child, we hope you will help us improve
              our program by answering a few questions.
            </h3>
            <p className="survey-paragraph-small">
              When you complete the post-celebration survey, you may choose a
              $10 gift card as a thank you.
            </p>

            <div className="survey-radio-group">
              <label className="survey-radio">
                <input
                  type="radio"
                  name="postSurvey"
                  value="yes"
                  checked={postSurveyPlan === "yes"}
                  onChange={(e) => setPostSurveyPlan(e.target.value)}
                />
                Yes, I will complete the post-celebration survey
              </label>
              <label className="survey-radio">
                <input
                  type="radio"
                  name="postSurvey"
                  value="no"
                  checked={postSurveyPlan === "no"}
                  onChange={(e) => setPostSurveyPlan(e.target.value)}
                />
                No, I do not plan to complete the post-celebration survey
              </label>
            </div>
          </section>

          {/* TERMS */}
          <section className="survey-section">
            <label className="survey-checkbox">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <span>
                I agree to the terms of use.{" "}
                <span className="survey-link">View terms of use</span>
              </span>
            </label>
          </section>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="survey-continue-btn">
            CONTINUE
          </button>
        </form>
      </main>
    </div>
  );
}
