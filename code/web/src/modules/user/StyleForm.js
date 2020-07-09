// Imports
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

// UI Imports
import { Grid, GridCell } from "../../ui/grid";
import { H3, H4 } from "../../ui/typography";
import Button from "../../ui/button";
import { grey, grey2 } from "../../ui/common/colors";

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
		let summary = "Your style is ";
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
					id="victorian"
					src={`/images/style-form/victorian_${
						this.state.categories[this.state.counter]
					}.jpg`}
					style={{ width: "30%", cursor: "pointer", margin: ".5em" }}
				/>
				<img
					onClick={(e) => this.addStyle(e)}
					id="goth"
					src={`/images/style-form/goth_${
						this.state.categories[this.state.counter]
					}.jpg`}
					style={{ width: "30%", cursor: "pointer", margin: ".5em" }}
				/>
				<img
					onClick={(e) => this.addStyle(e)}
					id="cosplay"
					src={`/images/style-form/cosplay_${
						this.state.categories[this.state.counter]
					}.jpg`}
					style={{ width: "30%", cursor: "pointer", margin: ".5em" }}
				/>
			</>
		);

		const subscriptionBtn = (
			<Link to={userRoutes.subscriptions.path} style={{ margin: "46.5%" }}>
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
						<H3 font="secondary">Style TES</H3>
						<H4 font="secondary">
							{(surveyOver && this.summarizeStyle(this.state.styles)) ||
								`Pick a style for ${this.state.categories[this.state.counter]}`}
						</H4>
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
// Profile.propTypes = {
//   user: PropTypes.object.isRequired,
//   logout: PropTypes.func.isRequired
// }

// Component State
function profileState(state) {
	return {
		user: state.user,
	};
}

export default connect(profileState, { setStyle })(StyleForm);
