import { LinesToShow, OverlayToShow } from './types.ts';

export default function GridOverlay({
  linesToShow,
  overlayToShow,
}: {
  linesToShow: LinesToShow;
  overlayToShow: OverlayToShow;
}) {
  return (
    <>
      <div className="columns">
        {linesToShow.column1 && <div className="column" />}
        {linesToShow.column2 && <div className="column" />}
      </div>
      <div className="rows">
        {linesToShow.row1 && <div className="row" />}
        {linesToShow.row2 && <div className="row" />}
      </div>

      <div className="columns-line-overlay">
        {overlayToShow.overlay1 && (
          <>
            <div className="column-line-overlay" />
            <div className="column-line-overlay" style={{ visibility: 'hidden' }} />
            <div className="column-line-overlay" style={{ visibility: 'hidden' }} />
          </>
        )}
        {overlayToShow.overlay2 && (
          <>
            <div className="column-line-overlay" style={{ visibility: 'hidden' }} />
            <div className="column-line-overlay" />
            <div className="column-line-overlay" style={{ visibility: 'hidden' }} />
          </>
        )}
        {overlayToShow.overlay3 && (
          <>
            <div className="column-line-overlay" style={{ visibility: 'hidden' }} />
            <div className="column-line-overlay" style={{ visibility: 'hidden' }} />
            <div className="column-line-overlay" />
          </>
        )}
      </div>
      <div className="rows-line-overlay">
        {overlayToShow.overlay4 && (
          <>
            <div className="row-line-overlay" />
            <div className="row-line-overlay" style={{ visibility: 'hidden' }} />
            <div className="row-line-overlay" style={{ visibility: 'hidden' }} />
          </>
        )}
        {overlayToShow.overlay5 && (
          <>
            <div className="row-line-overlay" style={{ visibility: 'hidden' }} />
            <div className="row-line-overlay" />
            <div className="row-line-overlay" style={{ visibility: 'hidden' }} />
          </>
        )}
        {overlayToShow.overlay6 && (
          <>
            <div className="row-line-overlay" style={{ visibility: 'hidden' }} />
            <div className="row-line-overlay" style={{ visibility: 'hidden' }} />
            <div className="row-line-overlay" />
          </>
        )}
      </div>
      <div className="diagonals-line-overlay-right">
        {overlayToShow.overlay7 && <div className="diagonal-line-overlay" />}
      </div>
      <div className="diagonals-line-overlay-left">
        {overlayToShow.overlay8 && <div className="diagonal-line-overlay" />}
      </div>
    </>
  );
}
