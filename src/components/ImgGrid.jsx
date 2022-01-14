import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ImgCard from "./ImgCard";

const ImgGrid = ({ query, review }) => {
	return (
		<Row className="grid-row" xs={1} md={2}>
			{query &&
				query.map((img) => (
					<Col key={img._id}>
						<ImgCard img={img} review={review} />
					</Col>
				))}
		</Row>
	);
};

export default ImgGrid;
