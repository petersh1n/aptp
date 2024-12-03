import Main from '../Custompage/sectionPart/Section/Main/Main';
import ApostlesCreed from '../Custompage/sectionPart/Section/ApostlesCreed/ApostlesCreed';
import Praise from '../Custompage/sectionPart/Section/Praise/Praise';
import LordPrayer from '../Custompage/sectionPart/Section/LordPrayer/LordPrayer';
import OfferingTime from '../Custompage/sectionPart/Section/OfferingTime/OfferingTime';
import ResponsiveReading from '../Custompage/sectionPart/Section/ResponsiveReading/ResponsiveReading';
import BibleReading from '../Custompage/sectionPart/Section/BibleReading/BibleReading';
import Sermon from '../Custompage/sectionPart/Section/Sermon/Sermon';
import CorporatePray from '../Custompage/sectionPart/Section/CorporatePray/CorporatePray';
import Benediction from '../Custompage/sectionPart/Section/Benediction/Benediction';
import Announcement from '../Custompage/sectionPart/Section/Announcement/Announcement';

const menuData = [
    {
        title: "Department",
        subItems: [
            {
                title: "Middle School Group",
                models: [
                    {
                        title: "Sunday",
                        sections: [
                            {
                                title: 'Main',
                                component: <Main />,
                                image: '/path/to/image1.jpg',
                            },
                        ],
                    },
                    {
                        title: "Summer Retreat",
                        sections: []
                    },
                    {
                        title: "Winter Retreat",
                        sections: []
                    }
                ]
            },
            {
                title: "Young Adult Group 1",
                models: [
                    {
                        title: "Sunday",
                        sections: [
                            {
                                title: 'Main',
                                component: <Main />,
                                image: '/path/to/image1.jpg',
                            },
                            {
                                title: 'ApostlesCreed',
                                component: <ApostlesCreed />,
                                image: '/path/to/image2.jpg',
                            },
                            {
                                title: 'Praise',
                                component: <Praise />,
                                image: '/path/to/image3.jpg',
                            },
                            {
                                title: 'LordPrayer',
                                component: <LordPrayer />,
                                image: '/path/to/image4.jpg',
                            },
                            {
                                title: 'OfferingTime',
                                component: <OfferingTime />,
                                image: '/path/to/image5.jpg',
                            },
                            {
                                title: 'ResponsiveReading',
                                component: <ResponsiveReading />,
                                image: '/path/to/image6.jpg',
                            },
                            {
                                title: 'BibleReading',
                                component: <BibleReading />,
                                image: '/path/to/image7.jpg',
                            },
                            {
                                title: 'Sermon',
                                component: <Sermon />,
                                image: '/path/to/image8.jpg',
                            },
                            {
                                title: 'CorporatePray',
                                component: <CorporatePray />,
                                image: '/path/to/image9.jpg',
                            },
                            {
                                title: 'Benediction',
                                component: <Benediction />,
                                image: '/path/to/image10.jpg',
                            },
                            {
                                title: 'Announcement',
                                component: <Announcement />,
                                image: '/path/to/image11.jpg',
                            }
                        ],
                    },
                    {
                        title: "Summer Retreat",
                        sections: []
                    },
                    {
                        title: "Winter Retreat",
                        sections: []
                    },
                    {
                        title: "Rodem Tree Prayer Meeting",
                        sections: []
                    }
                ]
            },
            {
                title: "Young Adult Group 2",
                models: []
            },
            {
                title: "Adult Group",
                models: []
            }
        ]
    },
    {
        title: "My page",
        subItems: []
    }
];

export default menuData;