import React from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

/*
	Bottom page copyright
*/

const Copyright = (): JSX.Element => (
	<div className="copyright bg-theme pd-t-10 pd-b-10">
		<div className="copyright__container ctn f-r-ce-st">
			<p className="prg white">
				Fait avec <Icon icon={["fas", "heart"]} /> par{" "}
				<a
					className="bold copyright__link gold"
					href="https://www.linkedin.com/in/harijaona-rajaonson-9456481b5/"
					title="Voir le profil"
				>
					Hari
				</a>{" "}
				et{" "}
				<a
					className="bold copyright__link gold"
					href="https://www.linkedin.com/in/rakotoarisoa-tahiriniaina-andrian-4a01aa211/"
					title="Voir le profil"
				>
					Tahir
				</a>
				.
			</p>
			<p className="prg white">
				Copyright © {new Date().getFullYear()} Singer, tous droits réservés.
			</p>
		</div>
	</div>
);

export default Copyright;
