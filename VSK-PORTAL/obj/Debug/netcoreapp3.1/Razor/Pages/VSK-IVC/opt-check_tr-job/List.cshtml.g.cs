#pragma checksum "D:\Project\vsk-project\MIS-PORTAL-8099\CN-REQ-PORTAL\VSK-PORTAL\Pages\VSK-IVC\opt-check_tr-job\List.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "65241f4d0537ac5567668d97e59d3eb3a8ee6db7"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.VSK_IVC.opt_check_tr_job.Pages_VSK_IVC_opt_check_tr_job_List), @"mvc.1.0.view", @"/Pages/VSK-IVC/opt-check_tr-job/List.cshtml")]
namespace MIS_PORTAL.Pages.VSK_IVC.opt_check_tr_job
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\Project\vsk-project\MIS-PORTAL-8099\CN-REQ-PORTAL\VSK-PORTAL\Pages\_ViewImports.cshtml"
using MIS_PORTAL;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"65241f4d0537ac5567668d97e59d3eb3a8ee6db7", @"/Pages/VSK-IVC/opt-check_tr-job/List.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_VSK_IVC_opt_check_tr_job_List : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("form-horizontal"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("frm_job"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frm_job"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("autocomplete", new global::Microsoft.AspNetCore.Html.HtmlString("off"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "65241f4d0537ac5567668d97e59d3eb3a8ee6db74562", async() => {
                WriteLiteral("\r\n    <div class=\"card\">\r\n        <div class=\"card-header pb-0\">\r\n            <h5 class=\"card-title mb-0 pb-0\">\r\n                ");
#nullable restore
#line 5 "D:\Project\vsk-project\MIS-PORTAL-8099\CN-REQ-PORTAL\VSK-PORTAL\Pages\VSK-IVC\opt-check_tr-job\List.cshtml"
           Write(ViewData["Content-Title-Page"]);

#line default
#line hidden
#nullable disable
                WriteLiteral(@"
                <label class=""tx-right tx-13 time-today mg-r-10"" style=""float: right;"">
                    ??????????????????????????????????????? :
                    <span id=""last_updatetime""></span>
                </label>
            </h5>
        </div>
        <div class=""card-body"">
            <div class=""form-group"">
                <div class=""row row-sm "">
                    <div class=""col-lg-2"">
                        <label for=""tr_number"" class=""col-form-label"">???????????????????????????????????? : </label>
                        <input type=""text"" class=""form-control"" id=""tr_number"" name=""tr_number"" placeholder=""TRA && TRB"">
                    </div>
                    <div class=""col-lg-2"">
                        <label for=""tr_date"" class=""col-form-label"">?????????????????? : </label>
                        <input type=""text"" class=""form-control"" id=""tr_date"" name=""tr_date"" disabled>
                    </div>
                    <div class=""col-lg-2"">
                        <label for=""tr_wh"" class=""col-form-label"">?????????");
                WriteLiteral(@"??? : </label>
                        <input type=""text"" class=""form-control"" id=""tr_wh"" name=""tr_wh"" disabled>
                    </div>
                    <div class=""col-lg-2"">
                        <label for=""tr_created_by"" class=""col-form-label"">?????????????????????????????? : </label>
                        <input type=""text"" class=""form-control"" id=""tr_created_by"" name=""tr_created_by"" disabled>
                    </div>
                    <div class=""col-lg-2"">
                        <label for=""tr_scan"" class=""col-form-label"">???????????? : </label>
                        <input type=""text"" class=""form-control"" id=""tr_scan"" name=""tr_scan"" disabled>
                    </div>
                    <div class=""col-lg-1"">
                        <label for=""tr_qty"" class=""col-form-label"">??????????????? : </label>
                        <input type=""number"" min=""0"" step=""1"" value=""1"" class=""form-control"" id=""tr_qty"" name=""tr_qty"" disabled>
                    </div>
                    <div class=""col-lg-1 mg-t-30 jus");
                WriteLiteral(@"tify-content-end"" align=""right"">
                        <button type=""reset"" class=""btn btn-dark btn-icon"" id=""reset_location""><i class=""typcn typcn-refresh""></i></button>
                    </div>
                </div>
            </div>
            <div class=""border-top my-3""></div>
            <div class=""row row-sm"">
                <div class=""col-xl-3"">
                    <div class=""card"">
                        <div class=""card-body"">
                            <div class=""card-order"">
                                <h6 class=""mb-2"">??????????????????</h6>
                                <h4 class=""text-right "">
                                    <i class=""las la-cubes icon-size float-left text-primary text-primary-shadow tx-30""></i>
                                    <span class=""item_total"">0</span>
                                </h4>
                                <p class=""mb-0"">????????????????????? <span class=""float-right""> ?????????????????? / ????????????</span></p>
                            </div>
      ");
                WriteLiteral(@"                  </div>
                    </div>
                </div>
                <div class=""col-xl-3"">
                    <div class=""card "">
                        <div class=""card-body"">
                            <div class=""card-widget"">
                                <h6 class=""mb-2"">?????????????????????</h6>
                                <h4 class=""text-right"">
                                    <i class=""las la-truck-loading icon-size float-left text-success text-success-shadow tx-30""></i>
                                    <span class=""item_current"">0</span>
                                </h4>
                                <p class=""mb-0"">????????????????????? <span class=""float-right""> ??????????????????</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=""col-xl-3"">
                    <div class=""card "">
                        <div class=""card-body"">
                            <div class=""car");
                WriteLiteral(@"d-widget"">
                                <h6 class=""mb-2"">????????????????????????</h6>
                                <h4 class=""text-right"">
                                    <i class=""las la-clipboard-list icon-size float-left text-warning tx-30""></i>
                                    <span class=""item_cn"">0</span>
                                </h4>
                                <p class=""mb-0"">????????????????????? <span class=""float-right""> ??????????????????</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=""col-xl-3"">
                    <div class=""card "">
                        <div class=""card-body"">
                            <div class=""card-widget"">
                                <h6 class=""mb-2"">?????????????????????</h6>
                                <h4 class=""text-right"">
                                    <i class=""las la-box-open icon-size float-left text-purple tx-30""></i>
                                  ");
                WriteLiteral(@"  <span class=""item_balance"">0</span>
                                </h4>
                                <p class=""mb-0"">????????????????????? <span class=""float-right""> ??????????????????</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class=""table-responsive"">
                <table id=""table_list"" class=""table table-bordered table-striped table-hover mg-b-0 text-md-nowrap"">
                </table>
            </div>
        </div>
    </div>
");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
