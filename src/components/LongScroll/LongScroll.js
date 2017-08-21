import React, {PureComponent} from 'react';

const LOAD_MORE_COUNT = 30;
const SCROLL_OFFSET = 50;


export default class LongScroll extends PureComponent{

    static defaultProps = {
        items: [],
        from: 0,
        to: 0,
        onChange: Function.prototype
    };

    state= {
        items: this.props.items,
    }

    componentDidMount() {
        // this.scrollToRow(0)
        console.log(this.scrollable)
        this.scrollable.addEventListener('scroll', this.handlerScroll);
        this.scrollable.addEventListener('resize', this.handlerScroll);
    }

    componentWillReceiveProps( nextProps ){
        if(this.state.items.length === 0){
            this.setState({items: nextProps})
        }
            console.log('1')

        this.setState({items: [ ...this.state.items, ...nextProps.items]});
        // if( this.props.items.length !== nextProps.items.length ){
        //     this.setState({items: [ ...this.state.items, ...nextProps.items]});
        // }
    };

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

    /**
     * НУЖНО СОЗДАТЬ МАССИВ ИНДЕКСОВ И ОТСЛЕЖИТЬ ДЛЯ СКРОЛИНГА ЕГО , А АЙТЕМЫ РЕНДЕРИТЬ ОТДЕЛНО
     */


    handlerScroll = () => {
        const { scrollTop, scrollHeight, offsetHeight } = this.getScrollInfo();

        if(this.state.items.length > 100){
            const { from, to }= this.props;
            const { items } = this.state;

            let sizeCat = (items.length/2).toFixed(0);
            let a = items.splice(0, sizeCat)
            console.log('cat', a)
            this.setState({items: a})
        }

        if( scrollTop > scrollHeight - offsetHeight - SCROLL_OFFSET ){
            // console.log('scrollHeight - offsetHeight - SCROLL_OFFSET', scrollHeight - offsetHeight - SCROLL_OFFSET)
            // console.log('scrollHeight - offsetHeight - SCROLL_OFFSET', scrollHeight - offsetHeight - SCROLL_OFFSET - 300)

          return  this.handelLoadDown();
        }

        if(scrollTop < SCROLL_OFFSET) {
            this.storePosition();
             this.handelLoadUp();
            this.tm = setTimeout(this.restorePosition());
        }
    }

    storePosition = () => {
        const { scrollTop, scrollHeight, offsetHeight } = this.getScrollInfo();
    }

    restorePosition = () => {
        const { scrollTop, scrollHeight, offsetHeight } = this.getScrollInfo();
    }

    renderRow = (item, index, arr) => {
        // console.log('index, arr', index, arr)
        return item;
    }


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

    render() {
        const { items } = this.props
        const styles = {
            overflow: 'auto',
            height: '50vh',
            width: 300,
            margin: '0 auto',
            border: '1px solid #d4d4d4',
            padding: 10,
            borderRadius: 5
        };

        const noneStyle = { display: 'none'};

        console.log('this', this.state);
        console.log('2');

        return(
            <div ref={element => {this.scrollable = element}}
                 style={styles}>
                <button style={noneStyle} onClick={this.handelLoadUp} >Load more</button>
                    {this.state.items.map(this.renderRow)}
                <button style={noneStyle} onClick={this.handelLoadDown} >Load more</button>
            </div>
        )
    }
}