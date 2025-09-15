import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTour: builder.mutation({
      query: (tourData) => ({
        url: "/tour/create",
        method: "POST",
        data: tourData,
      }),
      // invalidatesTags: ["TOUR"],
    }), 
    
    addTourType: builder.mutation({
      query: (tourTypeName) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourTypeName,
      }),
      invalidatesTags: ["TOURTYPE"],
    }),

    removeTourType: builder.mutation({
      query: (tourTypeId) => ({
        url: `/tour/tour-types/${tourTypeId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["TOURTYPE"],
    }),

    getTourTypes: builder.query({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
      providesTags: ["TOURTYPE"],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetTourTypesQuery, useAddTourTypeMutation, useRemoveTourTypeMutation, useAddTourMutation } = tourApi;
