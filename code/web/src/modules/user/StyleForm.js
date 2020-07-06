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

	render() {
		return (
			<div>
				{/* SEO */}
				<Helmet>
					<title>Style Preferences</title>
				</Helmet>

				{/* Top title bar */}
				<Grid style={{ backgroundColor: grey }}>
					<GridCell style={{ padding: "2em", textAlign: "center" }}>
						<H3 font="secondary">Your style</H3>
					</GridCell>
				</Grid>

				<Grid>
					<GridCell style={{ padding: "2em", textAlign: "center" }}>
						{/* <H4 style={{ marginBottom: "0.5em" }}>{props.user.details.name}</H4> */}

						{/* <p style={{ color: grey2, marginBottom: "2em" }}>
							{props.user.details.email}
						</p> */}

						<Link to={userRoutes.subscriptions.path}>
							<Button theme="primary">Confirm</Button>
						</Link>

						{/* <Button
							theme="secondary"
							style={{ marginLeft: "1em" }}>
							Logout
						</Button> */}
					</GridCell>
				</Grid>
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

export default connect(profileState)(StyleForm);
