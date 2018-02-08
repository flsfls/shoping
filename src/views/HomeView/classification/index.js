import React from 'react';
import Bscroll from 'better-scroll';
import './assets/style.less';

class Classification extends React.Component {
  state = {
    list: [],
    currentIndex: 0,
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        list: [
          {
            name: '饭类',
            inlist: [
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
            ],
          },
          {
            name: '饭类',
            inlist: [
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
            ],
          },
          {
            name: '饭类',
            inlist: [
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
            ],
          },
          {
            name: '饭类',
            inlist: [
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
            ],
          },
          {
            name: '饭类',
            inlist: [
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
            ],
          },
          {
            name: '饭类',
            inlist: [
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
            ],
          },
          {
            name: '饭类',
            inlist: [
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
            ],
          }, {
            name: '饭类',
            inlist: [
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
            ],
          },
          {
            name: '饭类',
            inlist: [
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
            ],
          },
          {
            name: '饭类',
            inlist: [
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
            ],
          },
          {
            name: '饭类',
            inlist: [
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
              { name: '大米饭' },
              { name: '小米饭' },
            ],
          },
        ],
      });
      this.calculateHeight();
      this.initScroll();
    }, 1000);
  }

  selectMenu = (index) => {
    const foodList = this.food.getElementsByClassName('food-list-hook');
    const height = foodList[index];
    console.log(height);
    this.foodScroll.scrollToElement(height, 300);
  }

  initScroll = () => {
    this.meunScroll = new Bscroll(this.menu, {
      click: true,
      probeType: 3,
    });

    this.foodScroll = new Bscroll(this.food, {
      click: true,
      probeType: 3,
    });
    this.foodScroll.on('scroll', (pos) => {
      this.scrollY = Math.abs(Math.round(pos.y));
      for (let i = 0; i < this.listHeight.length; i++) {// eslint-disable-line
        const height1 = this.listHeight[i];
        const height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          const munelist = this.menu.getElementsByClassName('meun-list-hook');
          if (i > 3) {
            this.meunScroll.scrollToElement(munelist[i - 2], 300);
          } else {
            this.meunScroll.scrollToElement(munelist[0], 300);
          }
          this.setState({
            currentIndex: i,
          });
          return;
        }
      }
      this.setState({
        currentIndex: 0,
      });
    });
  }

  foodHandler = () => {
    console.log('ffff');
  }

  calculateHeight = () => {
    this.listHeight = [];
    const foodList = this.food.getElementsByClassName('food-list-hook');
    let height = 0;
    this.listHeight.push(height);
    for (let i = 0; i < foodList.length; i++) { // eslint-disable-line
      const item = foodList[i];
      height += item.clientHeight;
      this.listHeight.push(height);
    }
  }

  render() {
    const { list } = this.state;
    const leftlist = list.map(i => i.name);
    return (
      <div className="inner_body classification ">
        <div className="menu_wrap" ref={(menu) => { this.menu = menu; }}>
          <ul>
            {
              leftlist.map((item, index) => (
                <li
                  className="meun-list-hook"
                  onClick={() => this.selectMenu(index)}
                  style={{ background: index === this.state.currentIndex ? 'blue' : '#fff' }}
                >
                  {item}
                </li>
              ))
            }
          </ul>
        </div>
        <div className="foods_wrap" ref={(food) => { this.food = food; }}>
          <ul>
            {
              list.map(item => (
                <li className="warp_li food-list-hook">
                  <p style={{ height: '.77rem', background: 'green' }}>{item.name}</p>
                  <ul>
                    {item.inlist.map(initem => (
                      <li className="innerLi" onClick={this.foodHandler}>
                        {initem.name}
                      </li>
                    ))}
                  </ul>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default Classification;
