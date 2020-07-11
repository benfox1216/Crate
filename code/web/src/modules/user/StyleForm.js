// Imports
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

// UI Imports
import { Grid, GridCell } from "../../ui/grid";
import { H3 } from "../../ui/typography";
import Button from "../../ui/button";
import { grey } from "../../ui/common/colors";
import { level1 } from "../../ui/common/shadows";


// App Imports
import userRoutes from "../../setup/routes/user";
import { setStyle } from "../user/api/actions";

// Component
class StyleForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			counter: 0,
			styles: [],
			categories: ["tops", "bottoms", "accessories", "shoes"],
		};
	}

	addStyle = (e) => {
		if (this.state.counter <= 3) {
			this.setState({
				styles: [...this.state.styles, e.target.id],
				counter: this.state.counter + 1,
			});
		}
	};

  summarizeStyle = (styleArr) => {
		let summary = `Your style is `;
		const summaryArr = [...new Set(styleArr)];
		summaryArr.forEach((style) => (summary += `${style} and `));
		const style = summary.substr(0, summary.length - 4);
		this.props.setStyle(style);
		return style;
	};

	render() {
		let images = (
      <>
        <img
          onClick={(e) => this.addStyle(e)}
          id="goth"
          src={`/images/style-form/goth_${
            this.state.categories[this.state.counter]
          }.jpg`}
          style={{
            width: "30%",
            cursor: "pointer",
            margin: ".5em",
            boxShadow: level1,
          }}
          alt={`Photo of goth-style ${
            this.state.categories[this.state.counter]
          }`}
        />
        <img
          onClick={(e) => this.addStyle(e)}
          id="victorian"
          src={`/images/style-form/victorian_${
            this.state.categories[this.state.counter]
          }.jpg`}
          style={{
            width: "30%",
            cursor: "pointer",
            margin: ".5em",
            boxShadow: level1,
          }}
          alt={`Photo of victorian-style ${
            this.state.categories[this.state.counter]
          }`}
        />
        <img
          onClick={(e) => this.addStyle(e)}
          id="cosplay"
          src={`/images/style-form/cosplay_${
            this.state.categories[this.state.counter]
          }.jpg`}
          style={{
            width: "30%",
            cursor: "pointer",
            margin: ".5em",
            boxShadow: level1,
          }}
          alt={`Photo of cosplay-style ${
            this.state.categories[this.state.counter]
          }`}
        />
      </>
    );

		const subscriptionBtn = (
			<Link to={userRoutes.subscriptions.path} style={{ margin: "45%" }}>
				<Button theme="primary">My subscriptions</Button>
			</Link>
		);

		const surveyOver = this.state.counter === 4;

		return (
      <div>
        {/* SEO */}
        <Helmet>
          <title>Style Preferences</title>
        </Helmet>

        {/* Top title bar */}
        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: "2em", textAlign: "center" }}>
            <H3 font="secondary">Style TEST</H3>
            <p style={{marginTop: "1em", color: "rgb(153, 153, 153)", fontSize: '20px'}}>
              {(surveyOver && `Thanks, ${this.props.user.details.name}! ${this.summarizeStyle(this.state.styles)}`) ||
                `Pick the set of ${this.state.categories[this.state.counter]}
								that makes your heart sing`}
            </p>
          </GridCell>
        </Grid>

        <Grid>
          <GridCell style={{ padding: "1em", textAlign: "center" }}>
            {surveyOver || images}
          </GridCell>
        </Grid>
        {surveyOver && subscriptionBtn}
      </div>
    );
	}
}

// Component Properties
StyleForm.propTypes = {
  user: PropTypes.object.isRequired,
}

// Component State
function styleFormState(state) {
	return {
		user: state.user,
	};
}

export default connect(styleFormState, { setStyle })(StyleForm);
