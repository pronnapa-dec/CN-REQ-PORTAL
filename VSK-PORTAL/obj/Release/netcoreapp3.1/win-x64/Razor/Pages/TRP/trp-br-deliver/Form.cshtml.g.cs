#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\TRP\trp-br-deliver\Form.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "b9d4b6823d765f7a330e04f09e1cb82f2dfd4d7f"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.TRP.trp_br_deliver.Pages_TRP_trp_br_deliver_Form), @"mvc.1.0.view", @"/Pages/TRP/trp-br-deliver/Form.cshtml")]
namespace MIS_PORTAL.Pages.TRP.trp_br_deliver
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
#line 1 "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\_ViewImports.cshtml"
using MIS_PORTAL;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"b9d4b6823d765f7a330e04f09e1cb82f2dfd4d7f", @"/Pages/TRP/trp-br-deliver/Form.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_TRP_trp_br_deliver_Form : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("frm_data"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frm_data"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("autocomplete", new global::Microsoft.AspNetCore.Html.HtmlString("off"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
            WriteLiteral("<!-- Scroll with content modal -->\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "b9d4b6823d765f7a330e04f09e1cb82f2dfd4d7f4184", async() => {
                WriteLiteral(@"
    <div class=""modal effect-flip-vertical"" id=""modal-frm_data"" data-keyboard=""false"" data-backdrop=""static"">
        <div class=""modal-dialog modal-dialog-scrollable modal-dialog-centered"" role=""document"" style=""max-width:720px"">
            <div class=""modal-content modal-content-demo"">
                <div class=""modal-header"">
                    <h6 class=""modal-title"">");
#nullable restore
#line 7 "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\TRP\trp-br-deliver\Form.cshtml"
                                       Write(ViewData["Content-Title-Page"]);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" BR</h6><button aria-label=""Close"" class=""close"" data-dismiss=""modal"" type=""button""><span aria-hidden=""true"">&times;</span></button>
                </div>
                <div class=""modal-body"">
                    <div class=""kt-portlet__body"">

                        <div class=""form-group form-group-sm  row"">
                            <label class=""col-sm-3 col-form-label"">เลขที่ BR :</label>
                            <div class=""col-sm-9"">
                                <input type=""text"" class=""form-control"" id=""brtra_number"" name=""brtra_number""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 1077, "\"", 1091, 0);
                EndWriteAttribute();
                BeginWriteAttribute("value", " value=\"", 1092, "\"", 1100, 0);
                EndWriteAttribute();
                WriteLiteral(@" style=""font-weight:bold;"" readonly>
                            </div>
                        </div>
                        <div class=""form-group form-group-sm  row"">
                            <label for=""deliver_driver"" class=""col-sm-3 col-form-label"">คนขับรถ :</label>
                            <div class=""col-sm-3 input-group"">
                                <input class=""form-control deliver_driver"" id=""deliver_driver"" name=""deliver_driver"" type=""text""");
                BeginWriteAttribute("value", " value=\"", 1575, "\"", 1583, 0);
                EndWriteAttribute();
                WriteLiteral(@" required data-parsley-error-message=""""><span class=""input-group-btn""><button class=""btn btn-dark "" id=""btn-clear""><span class=""input-group-btn""><i class=""fas fa-redo-alt""></i></span></button></span>
                            </div>
                            <div class=""col-sm-3"">
                                <label id=""driver_name"" class=""col-form-label tx-left tx-value""></label>
                            </div>
                            <div class=""col-sm-3"">
                                <label id=""driver_id"" class=""col-form-label tx-left tx-value""></label>
                            </div>
                        </div>
                        <div class=""form-group form-group-sm row"">
                            <label class=""col-sm-3 col-form-label"">สายนำส่ง : </label>
                            <div class=""col-sm-9"">
");
                WriteLiteral("                                <input class=\"form-control deliver_route\" id=\"deliver_route\" name=\"deliver_route\" type=\"text\"");
                BeginWriteAttribute("value", " value=\"", 2852, "\"", 2860, 0);
                EndWriteAttribute();
                WriteLiteral(@" required>
                            </div>
                        </div>
                        <div class=""form-group form-group-sm row "">
                            <label class=""col-sm-3 col-form-label"">หมายเหตุ :</label>
                            <div class=""col-sm-9"">
                                <textarea class=""form-control "" id=""deliver_remark"" name=""deliver_remark""></textarea>
                            </div>
                        </div>
                        <div class=""form-group form-group-sm row "">
                            <label class=""col-sm-3 col-form-label"">ผู้ตรวจสอบสินค้า :</label>
                            <div class=""col-sm-5"">
                                <label for=""vgrmaxdate_grmaxdate"" id=""check_by"" name=""check_by"" class=""col-form-label tx-left tx-value"">&nbsp;รอ</label>
                            </div>
                            
                        </div>
                    </div>
                    <div class=""modal-footer"">
     ");
                WriteLiteral(@"                   <button id=""btn-save_exit"" class=""btn ripple btn-primary btn-save_form"" data-action=""save_exit"" type=""submit"">Save</button>
                        <button class=""btn ripple btn-secondary"" data-dismiss=""modal"" type=""button"">Close</button>
                    </div>

                    <h6 class=""modal-title text-center"">ประวัติการนำส่ง</h6>
                    <div class=""border-top my-3""></div>
                    <div class=""table-responsive mg-t-20"">
                        <table id=""tbl-list-deliver"" class=""table table-bordered table-striped table-hover mg-b-0 text-md-nowrap"">
                            <thead>
                                <tr>
                                    <th class=""d-none"">id</th>
                                    <th><div style=""text-align:center; width:30px;"" class=""text-center"">ครั้งที่</div></th>
                                    <th><div style=""text-align:center; width:70px;"" class=""text-center"">คนขับรถ</div></th>
                   ");
                WriteLiteral(@"                 <th><div style=""text-align:center; width:70px;"" class=""text-center"">สายนำส่ง</div></th>
                                    <th><div style=""text-align:center; width:70px;"" class=""text-center"">หมายเหตุ</div></th>
                                    <th><div style=""text-align:center; width:70px;"" class=""text-center"">เวลานำส่ง</div></th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!--End Scroll with content modal -->
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