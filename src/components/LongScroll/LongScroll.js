import React, {Component} from 'react';

const LOAD_MORE_COUNT = 30;

export default class LongScroll extends Component{

    static defaultProps = {
        items: [],
        from: 0,
        to: 0,
        onChange: Function.prototype
    };

    componentDidMount() {
        // this.scrollToRow(0)
        this.scrollable.addEventListener('scroll', this.handlerScroll);
        this.scrollable.addEventListener('resize', this.handlerScroll);
    }

    componentWillUnmount() {
        this.scrollable.removeEventListener('scroll', this.handlerScroll);
        this.scrollable.removeEventListener('resize', this.handlerScroll);
    }

    handlerScroll = () => {
        console.log(this.getScrollInfo())
    }

    getScrollInfo = () => ({
        scrollTop: this.scrollable.scrollTop,
        scrollHeightL: this.scrollable.scrollHeight,
        offsetHeight: this.scrollable.offsetHeight
    })

    renderRow = item => item;

    handelLoadUp = () => {
        const { onChange ,from, to } = this.props
        onChange({
            from: from - LOAD_MORE_COUNT,
            to
        });
    };

    handelLoadDown = () => {
        const { onChange ,from, to } = this.props
        onChange({
            from,
            to: to + LOAD_MORE_COUNT
        });
    };

    render() {
        const { items } = this.props
        const styles = {
            overflow: 'auto',
            height: '50vh'
        }

        return(
            <div ref={element => {this.scrollable = element}}
                 style={styles}>
                <button onClick={this.handelLoadUp} >Load more</button>
                    {items.map(this.renderRow)}
                <button onClick={this.handelLoadDown} >Load more</button>
            </div>
        )
    }
}