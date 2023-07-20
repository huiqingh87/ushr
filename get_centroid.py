import sys
import geopandas as gpd


def main():
    # Check if at least one argument is provided
    if len(sys.argv) < 2:
        print("Usage: python get_centroid.py <shapefile path>")
        return

    # Get the argument passed through the command line
    fn = sys.argv[1]



    df = gpd.read_file(fn)
    df['centroid_str'] = df.geometry.apply(lambda g:"%s,%s"%(g.centroid.x,g.centroid.y))
    try:
        df.to_csv(fn.replace(".shp",".csv"))
        print("New csv file with centroind coordinates is saved") 
    except:
        print("ERROR OCCURED")
if __name__ == "__main__":
    main()
