var ImageModal = React.createClass({
	render: function(){		
		var self = this;
		var image = null;
		var title = null;
		var backgroundImage = null;

		if(self.props.image){
			image = <img className="customimagemodal-image" alt="Popup Image" src= {self.props.image.originalurl} />
			title = <div className="customimagemodal-title">{self.props.image.title}</div>;
			backgroundImage = "url('" +self.props.image.middleurl + "')";
		}
		return (<div key="modal" className="customimagemodal" onClick={this.props.close} style={{opacity: this.props.image? 1 : 0, visibility: this.props.image? 'visible' : 'hidden'}}>
			<div className="customimagemodal-blurbackground" style={{backgroundImage:backgroundImage}}></div>
			<div className="customimagemodal-container">
				<div className="customimagemodal-spinner">
						<div className="xspinner cube-spinner">
							<div className="spinner-box"></div>
						</div>
				</div>
				<div className="customimagemodal-imagecontainer">
					{image}
				</div>
				{title}
			</div>
		</div>)
	}
});

var Image = React.createClass({
	clickImage: function(e){
		e.preventDefault();
		this.props.click(this.props.image);
	},
	render: function(){
		var self = this;
		return (<div key={Math.random()} className="img">
				<a href="#" className="imglink" onClick={self.clickImage}>
					<img src="http://placehold.it/350x150" /> 
					{/* <img src={self.props.image.middleurl} data-originalurl={self.props.image.originalurl}/>  */}
					<div className="title">{self.props.image.title}</div>
				</a>
				</div>
		)
	}
});

var ImageGallery = React.createClass({
	getInitialState: function() {
		return {
			sourceImages: null,
			images: null,
			loading: true,
			activeImage: null,
			from: -1,
			to: -1,
		};
	},
	componentDidMount: function() {
		var self = this;
		this.serverRequest = $.ajax({
			url: this.props.source,
			success:function (result) {
				self.setState({loading: false, sourceImages:result,  images: result});
				self.filterImages(0,10);
			}.bind(this)
		});
	},
	componentWillUnmount: function() {
		this.serverRequest.abort();
	},
	closeModal: function(e){
		e.preventDefault()
		this.setState({activeImage: null});
	},
	imageClick: function(e){
		this.setState({activeImage: e})
	},
	showAllImages: function(e){
		e.preventDefault()
		var self = this;
		self.filterImages();
	},
	filterImages: function(from, to){
		if(from != null && from != undefined && from >= 0 && to != null && to != undefined && to >= 0){
			console.log(this.state.sourceImages);
			var _from = from;
			var _to = to + 1;
			this.setState({
				images:this.state.sourceImages.slice(_from, _to)
			});
		}else{
			this.setState({
				images:this.state.sourceImages
			});
		}
	},
	getImages: function(){
		var self = this;
		return this.state.images.map(function(i){
			return <Image image={i} click={self.imageClick}/>
		});
	},
	render: function() {
		var self = this;

		if(this.state.loading){
			return <div>Loading...</div>
		}
		return (
			<div className="row" key="x">
				<section id="photos" key="photos">
					Hello
					{self.getImages()}
				</section>
				<a href="#"  onClick={self.showAllImages}>More</a>
				<ImageModal image={self.state.activeImage} close={this.closeModal}/>
			</div>
		);
	}
});
window.ImageGallery = ImageGallery;