var ImageModal = React.createClass({
	displayName: "ImageModal",

	render: function () {
		var self = this;
		var image = null;
		var title = null;
		var backgroundImage = null;

		if (self.props.image) {
			image = React.createElement("img", { className: "customimagemodal-image", alt: "Popup Image", src: self.props.image.originalurl });
			title = React.createElement(
				"div",
				{ className: "customimagemodal-title" },
				self.props.image.title
			);
			backgroundImage = "url('" + self.props.image.middleurl + "')";
		}
		return React.createElement(
			"div",
			{ key: "modal", className: "customimagemodal", onClick: this.props.close, style: { opacity: this.props.image ? 1 : 0, visibility: this.props.image ? 'visible' : 'hidden' } },
			React.createElement("div", { className: "customimagemodal-blurbackground", style: { backgroundImage: backgroundImage } }),
			React.createElement(
				"div",
				{ className: "customimagemodal-container" },
				React.createElement(
					"div",
					{ className: "customimagemodal-spinner" },
					React.createElement(
						"div",
						{ className: "xspinner cube-spinner" },
						React.createElement("div", { className: "spinner-box" })
					)
				),
				React.createElement(
					"div",
					{ className: "customimagemodal-imagecontainer" },
					image
				),
				title
			)
		);
	}
});

var Image = React.createClass({
	displayName: "Image",

	clickImage: function (e) {
		e.preventDefault();
		this.props.click(this.props.image);
	},
	render: function () {
		var self = this;
		return React.createElement(
			"div",
			{ key: Math.random(), className: "img" },
			React.createElement(
				"a",
				{ href: "#", className: "imglink", onClick: self.clickImage },
				React.createElement("img", { src: "http://placehold.it/350x150" }),
				React.createElement(
					"div",
					{ className: "title" },
					self.props.image.title
				)
			)
		);
	}
});

var ImageGallery = React.createClass({
	displayName: "ImageGallery",

	getInitialState: function () {
		return {
			sourceImages: null,
			images: null,
			loading: true,
			activeImage: null,
			from: -1,
			to: -1
		};
	},
	componentDidMount: function () {
		var self = this;
		this.serverRequest = $.ajax({
			url: this.props.source,
			success: function (result) {
				self.setState({ loading: false, sourceImages: result, images: result });
				self.filterImages(0, 10);
			}.bind(this)
		});
	},
	componentWillUnmount: function () {
		this.serverRequest.abort();
	},
	closeModal: function (e) {
		e.preventDefault();
		this.setState({ activeImage: null });
	},
	imageClick: function (e) {
		this.setState({ activeImage: e });
	},
	showAllImages: function (e) {
		e.preventDefault();
		var self = this;
		self.filterImages();
	},
	filterImages: function (from, to) {
		if (from != null && from != undefined && from >= 0 && to != null && to != undefined && to >= 0) {
			console.log(this.state.sourceImages);
			var _from = from;
			var _to = to + 1;
			this.setState({
				images: this.state.sourceImages.slice(_from, _to)
			});
		} else {
			this.setState({
				images: this.state.sourceImages
			});
		}
	},
	getImages: function () {
		var self = this;
		return this.state.images.map(function (i) {
			return React.createElement(Image, { image: i, click: self.imageClick });
		});
	},
	render: function () {
		var self = this;

		if (this.state.loading) {
			return React.createElement(
				"div",
				null,
				"Loading..."
			);
		}
		return React.createElement(
			"div",
			{ className: "row", key: "x" },
			React.createElement(
				"section",
				{ id: "photos", key: "photos" },
				"Hello",
				self.getImages()
			),
			React.createElement(
				"a",
				{ href: "#", onClick: self.showAllImages },
				"More"
			),
			React.createElement(ImageModal, { image: self.state.activeImage, close: this.closeModal })
		);
	}
});
window.ImageGallery = ImageGallery;