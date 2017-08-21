import React, {PureComponent} from 'react';
import './main.css';
const LOAD_MORE_COUNT = 30;
const SCROLL_OFFSET = 50;


export default class LongScroll extends PureComponent{

    static defaultProps = {
        items: [],
        from: 0,
        to: 0,
        onChange: Function.prototype
    };

    componentDidMount() {
        this.scrollable.addEventListener('scroll', this.handlerScroll);
        this.scrollable.addEventListener('resize', this.handlerScroll);
    }

    /**
     * Данные скрола
     * scrollTop -- расположение скрола относительно блока;
     * scrollHeight -- высота скрола;
     * offsetHeight -- высота блока;
     */
    getScrollInfo = () => ({
        scrollTop: this.scrollable.scrollTop,
        scrollHeight: this.scrollable.scrollHeight,
        offsetHeight: this.scrollable.offsetHeight
    })

    handlerScroll = () => {
        const { scrollTop, scrollHeight, offsetHeight } = this.getScrollInfo();

        console.log('scrollTop', scrollTop);  // -- расположение скрола
        console.log('scrollHeight', scrollHeight); // -- высота скрола
        console.log('offsetHeight', offsetHeight); // -- высота блока скрола

        if(this.disableScroll) {
            return;
        }

        if( scrollTop > scrollHeight - offsetHeight - SCROLL_OFFSET ){
            return  this.handelLoadDown();
        }

        if(scrollTop < SCROLL_OFFSET) {
            this.storePosition();
            this.handelLoadUp();
            this.tm = setTimeout(this.restorePosition());
        }
    }

    storePosition = () => {
        const { scrollTop, offsetHeight } = this.getScrollInfo();
        this.oldOffsetHeight = offsetHeight;
        this.oldScrollTop = scrollTop;
        this.disableScroll = true;
    }

    restorePosition = () => {
        const { offsetHeight } = this.getScrollInfo();
        this.scrollable.scrollTop = (offsetHeight - this.oldOffsetHeight) + this.oldScrollTop;;
        this.disableScroll = false;
    }

    renderRow = item => item;


    /** Подшрузка items в верх списка; */
    handelLoadUp = () => {
        const { onChange ,from, to } = this.props
        onChange({
            from: from,
            to
        });
    };

    /** Подгрузка items в низ списка; */
    handelLoadDown = () => {
        const { onChange ,from, to } = this.props
        onChange({
            from,
            to: to + LOAD_MORE_COUNT
        });
    };

    componentWillUnmount() {
        this.scrollable.removeEventListener('scroll', this.handlerScroll);
        this.scrollable.removeEventListener('resize', this.handlerScroll);
        clearTimeout(this.tm);
    }

    positionTop = () =>{
        this.scrollable.scrollTop = 0;
    }

    positionDown = () => {
        const { scrollHeight, offsetHeight } = this.getScrollInfo();
        this.scrollable.scrollTop = scrollHeight - offsetHeight - SCROLL_OFFSET - 1;
    }

    render() {
        const { items } = this.props

        return(
            <div>
                <div className='handel-scroll-top' onClick={this.positionTop} />
                <div className="items-block" ref={element => {this.scrollable = element}}
                     onClick={(e) => console.log(e.target.id)}>
                    <button onClick={this.handelLoadUp} >Load more</button>
                    {items.map(this.renderRow)}
                    <button onClick={this.handelLoadDown} >Load more</button>
                </div>
                <div className='handel-scroll-down' onClick={this.positionDown} />
            </div>
        )
    }
}