import React from 'react'
import LineChart from './line-chart.js'

function Chart() {
  return (
    <div className='chart' style={{marginTop:"30px"}}>
         <div class="row" style={{paddingLeft:"15px", paddingRight:"15px"}}> 
           <div class="col-xl-12">
                <div class="card bg-white">
                  <div class="card-header border-0 align-items-center d-flex bg-white">
                   <h4 class="card-title mb-0 flex-grow-1">Projects Overview</h4>
             <div>
    <button type="button" class="btn btn-soft-secondary btn-sm">
        ALL
    </button>
    <button type="button" class="btn btn-soft-secondary btn-sm">
        1M
    </button>
    <button type="button" class="btn btn-soft-secondary btn-sm">
        6M
    </button>
    <button type="button" class="btn btn-soft-secondary btn-sm">
        1Y
    </button>
        </div>
          </div>
                {/* <!-- end card header --> */}
                <div className='headers'>
        <div class="card-header p-0 border-0 bg-white">
<        div class="row g-0 text-center">
           <div class="col-6 col-sm-4">
              <div class="p-3 border border-dashed border-start-0">
            <h5 class="mb-1"><span class="counter-value" data-target="9851">9,851</span></h5>
            <p class="text-muted mb-0">Number of Projects</p>
        </div>
    </div>
    {/* <!--end col--> */}
    <div class="col-6 col-sm-4">
        <div class="p-3 border border-dashed border-start-0">
            <h5 class="mb-1"><span class="counter-value" data-target="1026">1,026</span></h5>
            <p class="text-muted mb-0">Active Projects</p>
        </div>
    </div>
    {/* <!--end col--> */}
    <div class="col-6 col-sm-4">
        <div class="p-3 border border-dashed border-start-0 border-end-0">
            <h5 class="mb-1 text-success "><span class="counter-value" data-target="10589">10,589</span>h</h5>
            <p class="text-muted mb-0">Working Hours</p>
        </div>
    </div>
</div>
 {/* <!--end col--> */}
</div>
{/* <!-- end card header --> */}
        <div class="card-body p-0 pb-2">
            <LineChart/>
                      </div>
                      </div>
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
        </div>
        </div>
       
  
  )
}

export default Chart