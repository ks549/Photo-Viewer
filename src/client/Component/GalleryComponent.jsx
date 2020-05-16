import React, { useState, useEffect } from "react";
import './Gallery.scss';

let limit = 20;
export const GalleryComponent = props => {
    let { gallery = null, getGalleryInfo } = props;
    let [imageList, setImageList] = useState([]),
        [offSet, settingOffSet] = useState(0),
        [showZoomed, setZoom] = useState(false),
        [currentUrl, setCurrentUrl] = useState(''),
        [dimension, setDimension] = useState({}),
        [isGreyScale, setGreyScale] = useState(false);
    useEffect(() => {
        let href = location.href.split('?');
        let item = href[href.length - 1];
        if (item == 'grayscale')
            setGreyScale(true);
        if (!gallery)
            props.getGalleryInfo(limit, offSet);
    })

    useEffect(() => {
        if (gallery && gallery.data) {
            let { source } = gallery;
            let { data } = gallery.data;
            if (source == 'filter') {
                setImageList([...data]);
            }
            else {
                setImageList([...imageList, ...data]);
            }
        }

    }, [gallery]);

    const loadMore = () => {
        let { total_record, ending_id } = gallery && gallery.data;
        offSet = offSet + limit;
        if (total_record - (offSet + limit) < 0) {
            offSet = total_record
        }
        props.getGalleryInfo(limit, offSet, ending_id);
        settingOffSet(offSet);
    }
    const changeTxt = (e, x) => {
        dimension[x] = Number.parseInt(e.target.value);
        setDimension(dimension);
    }
    const filterDimension = () => {
        let isValid = true;
        Object.keys(dimension).forEach((item) => {
            if (!Number.isInteger(dimension[item])) {
                isValid = false;
                alert("Please enter valid dimension in 'px' format");
            }
        });
        if (Object.keys(dimension).length < 2) {
            alert("Please enter height and width in 'px' format");
        }
        if (isValid && Object.keys(dimension).length == 2) {
            props.filterDimension(dimension);
        }
    }
    const reset = () => {
        let offSet = 0;
        props.getGalleryInfo(limit, offSet);
        settingOffSet(offSet);
    }
    let total_record = gallery && gallery.data && gallery.data['total_record'] || null;
    let status = gallery && gallery['status'] || null;
    let source = gallery && gallery['source'] || null;
    return (
        <>
            <div className='filter-block'>
                <div>Width:<input type='text' className='txtbox' onChange={(e) => changeTxt(e, 'width')} /></div>
                <div>Height:<input type='text' className='txtbox' onChange={(e) => changeTxt(e, 'height')} /></div>
                <button className='btn' onClick={() => filterDimension()}>Filter</button>
                <button className='btn' onClick={() => reset()}>Reset</button>
            </div>
            <div className='photo-viewer'>
                {imageList && imageList.map((items, idx) => {

                    let { url } = items;
                    let urlArr = url.split('/');
                    let width = urlArr[urlArr.length - 1];
                    let height = urlArr[urlArr.length - 2];
                    let item = (idx + 1) % 6;
                    if (item == 0)
                        item = 6;
                    let cx = `gallery__item--${item}`;
                    if (isGreyScale) {
                        return (
                            <img className='img-block' src={url} style={{ filter: 'grayscale(100%)' }} />
                        )
                    }
                    else {
                        return (
                            <img className='img-block' src={url} />
                        )
                    }

                })
                }
            </div>
            {status == 'completed' && imageList.length == 0 && source == 'filter' && <div>Search not found...</div>}
            {status == 'inprogress' && <div className='loading'>Loading...</div>}
            {total_record && (total_record - (offSet + limit) > 0) && <div className='showMore' onClick={() => loadMore()}>Show More >></div>}
        </>
    );

}