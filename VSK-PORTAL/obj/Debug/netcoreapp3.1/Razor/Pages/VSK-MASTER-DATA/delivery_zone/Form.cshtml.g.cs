#pragma checksum "D:\Project\vsk-project\MIS-PORTAL-8099\CN\VSK-PORTAL\Pages\VSK-MASTER-DATA\delivery_zone\Form.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "565e707bb342bd07391e4eb85f34b6ba851ce414"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.VSK_MASTER_DATA.delivery_zone.Pages_VSK_MASTER_DATA_delivery_zone_Form), @"mvc.1.0.view", @"/Pages/VSK-MASTER-DATA/delivery_zone/Form.cshtml")]
namespace MIS_PORTAL.Pages.VSK_MASTER_DATA.delivery_zone
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
#line 1 "D:\Project\vsk-project\MIS-PORTAL-8099\CN\VSK-PORTAL\Pages\_ViewImports.cshtml"
using MIS_PORTAL;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"565e707bb342bd07391e4eb85f34b6ba851ce414", @"/Pages/VSK-MASTER-DATA/delivery_zone/Form.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_VSK_MASTER_DATA_delivery_zone_Form : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "565e707bb342bd07391e4eb85f34b6ba851ce4144291", async() => {
                WriteLiteral(@"
    <div class=""modal effect-flip-vertical"" id=""modal-frm_data"" data-keyboard=""false"" data-backdrop=""static"" tabindex=""-1"">
        <div class=""modal-dialog modal-dialog-scrollable modal-dialog-centered"" role=""document"">
            <div class=""modal-content modal-content-demo"">
                <div class=""modal-header"">
                    <h6 class=""modal-title"">เพิ่มข้อมูลบริษัทขนส่งเอกชน</h6>
");
                WriteLiteral(@"                    <button aria-label=""Close"" class=""close"" data-dismiss=""modal"" type=""button""><span aria-hidden=""true"">&times;</span></button>
                </div>
                <div class=""modal-body"">
                    <div class=""kt-portlet__body"">
                        <div class=""row row-sm mg-t-20"">
                            <div class=""col-lg"">
                                <label class=""tx-13 tx-medium tx-gray-700"" style=""padding-left: 5px;"">พื้นที่</label>
                                <select class=""form-control form-control-sm zone"" id=""zone"" name=""zone"" style=""width: 100%; margin-top: -3px;"" required data-parsley-error-message=""กรุณาเลือกพื้นที่"">
");
                WriteLiteral(@"                                </select>
                            </div>
                            <div class=""col-lg mg-t-10 mg-lg-t-0"">
                                <label class=""tx-13 tx-medium tx-gray-700"" style=""padding-left: 5px;"">พื้นที่ย่อย </label>
                                <select class=""form-control form-control-sm route"" id=""route"" name=""route"" style=""width: 100%; margin-top: -3px;"" required data-parsley-error-message=""กรุณาเลือกพื้นที่ย่อย"">
");
                WriteLiteral(@"                                </select>
                            </div>
                        </div>
                        <div class=""row row-sm mg-t-20"">
                            <div class=""col-lg"">
                                <label class=""tx-13 tx-medium tx-gray-700"" style=""padding-left: 5px;"">ชื่อบริษัทขนส่งเอกชน</label>
                                <input class=""form-control form-control-sm"" placeholder=""ชื่อบริษัทขนส่งเอกชน"" type=""text"" id=""name_transprot"" name=""name_transprot"" style=""margin-top: -3px;"" required data-parsley-error-message=""ชื่อบริษัทขนส่งเอกชน"">
                            </div>
                        </div>
                        <div class=""alert alert-danger check d-none"" role=""alert"">
                            <span class=""alert-inner--icon""><i class=""fe fe-info""></i></span>
                            <span class=""alert-inner--text""><strong>Warning!</strong> ชื่อขนส่งซ้ำ กรุณาเปลี่ยนใหม่!</span>
                        </div>
                 ");
                WriteLiteral("       <div class=\"row row-sm mg-t-20\">\r\n                            <div class=\"col-lg\">\r\n                                <label class=\"tx-13 tx-medium tx-gray-700\" style=\"padding-left: 5px;\">เวลาทำการ</label>\r\n");
                WriteLiteral("\r\n                            <div class=\"input-group mb-2 bootstrap-timepicker\">\r\n                                <input class=\"form-control event-time-from\" id=\"opening_time\" type=\"text\"");
                BeginWriteAttribute("value", " value=\"", 3954, "\"", 3962, 0);
                EndWriteAttribute();
                WriteLiteral(" placeholder=\"HH:MM\">&nbsp;&nbsp;\r\n");
                WriteLiteral(@"                                <div class=""input-group-prepend"">
                                    <div class=""input-group-text"">ถึง</div>
                                </div>&nbsp;&nbsp;
                                <input class=""form-control event-time-from"" id=""close_time"" type=""text""");
                BeginWriteAttribute("value", " value=\"", 4498, "\"", 4506, 0);
                EndWriteAttribute();
                WriteLiteral(" placeholder=\"HH:MM\">&nbsp;&nbsp;\r\n");
                WriteLiteral(@"                            </div>
                            </div>
                        </div>
                        <div class=""row row-sm mg-t-20"">
                            <div class=""col-lg"">
                                <label class=""tx-13 tx-medium tx-gray-700"" style=""padding-left: 5px;"">หมายเหตุ</label>
                                <textarea class=""form-control"" id=""remark"" rows=""4""></textarea>
                            </div>
                        </div>
                        <div class=""row row-sm mg-t-20"">
                            <div class=""col-md-2"">
                                <label class=""tx-13 tx-medium tx-gray-700"" style=""padding-left: 5px;"">สถานะ</label>
                            </div>
                            <div class=""col-auto"">
                                <label class=""rdiobox""><input type=""radio"" id=""record_status_1"" class=""record_status"" name=""rdio"" value=""1""> <span class=""tx-success"">ใช้งาน</span></label>
                       ");
                WriteLiteral("     </div>\r\n                            <div class=\"col-auto\">\r\n                                <label class=\"rdiobox\"><input type=\"radio\" id=\"record_status_2\" class=\"record_status\" name=\"rdio\" value=\"0\"");
                BeginWriteAttribute("checked", " checked=\"", 5957, "\"", 5967, 0);
                EndWriteAttribute();
                WriteLiteral(@"> <span class=""tx-danger"">ไม่ใช้งาน</span></label>
                            </div>
                        </div>

                        <div class=""modal-footer"">
                            <button id=""btn-save_exit"" class=""btn ripple btn-primary btn-save_form"" data-action=""save_exit"" type=""submit"">Save</button>
                            <button id=""btn-save_new"" class=""btn ripple btn-success btn-save_form"" data-action=""save_new"" type=""submit"">Save & New</button>
                            <button class=""btn ripple btn-danger"" data-dismiss=""modal"" type=""button"" style=""width: 100px;"">Close</button>
                        </div>

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
