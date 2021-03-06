import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { auth, tip } from "../../util/i18n";
import { Singup } from "../../component/Login/Signup";
import { Signin } from "../../component/Login/Signin";
import { Lang } from "../../component/Lang";
import { selector as authSelector, creator as authCreator } from "../../store/auth";
import { selector as sysSelector, creator as sysCreator } from "../../store/system";
const logo = require("../../../static/meta/logo.png");
import "./style.less";

const AuthView = (props) => {
	const { lang, status, setLang } = props;
	const [isSign, setIsSign] = useState(true);

	if (status) {
		return <Redirect to="/" />;
	}

	return (
		<div className="authbox">
			<Lang lang={lang} offColor="rgb(77, 77, 77)" toggle={setLang} />
			<img className="logo" src={logo}></img>
			{isSign ? (
				<>
					<Signin {...props} />
					<div className="tipbox">
						<a>{auth.forget_passwd[lang]}</a>
						<a onClick={() => setIsSign(!isSign)}>{auth.no_account[lang]}</a>
					</div>
				</>
			) : (
				<>
					<Singup {...props} />
					<div className="tipbox">
						<a onClick={() => setIsSign(!isSign)}>{tip.cancel[lang]}</a>
					</div>
				</>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		lang: sysSelector.getLang(state),
		status: authSelector.getSatus(state),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		...bindActionCreators(authCreator, dispatch),
		...bindActionCreators(sysCreator, dispatch),
	};
};

const Auth = connect(mapStateToProps, mapDispatchToProps)(AuthView);

export { Auth };
